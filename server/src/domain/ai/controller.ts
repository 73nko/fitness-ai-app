import { FastifyInstance } from 'fastify';
import { PrismaClient } from '../../../generated/prisma';
import OpenAI from 'openai';

interface GenerateTrainingRequest {
  userId: string;
  name: string;
  description?: string;
  daysPerWeek: number;
  focusArea: string;
  sessionDuration: number;
  includeWarmup: boolean;
  includeCooldown: boolean;
}

interface Exercise {
  name: string;
  description: string;
  sets: number;
  reps: string;
  restTime?: number;
  notes?: string;
  dayOfWeek: number;
  order: number;
}

interface TrainingPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  exercises: Exercise[];
}

/**
 * Generate a training plan using OpenAI
 */
export async function generateTrainingPlan(
  fastify: FastifyInstance,
  params: GenerateTrainingRequest
): Promise<TrainingPlan> {
  try {
    // Get user profile
    const userProfile = await fastify.prisma.profile.findUnique({
      where: { userId: params.userId },
      include: { user: true },
    });

    if (!userProfile) {
      throw new Error('User profile not found');
    }

    // Prepare prompt for OpenAI
    const prompt = generateTrainingPrompt(userProfile, params);

    // Call OpenAI API
    const response = await fastify.openai.chat.completions.create({
      model: 'gpt-4', // or whichever model you prefer
      messages: [
        {
          role: 'system',
          content:
            'You are a professional fitness trainer with expertise in creating customized workout plans.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    // Parse the response
    const trainingData = JSON.parse(
      response.choices[0].message.content || '{}'
    );

    // Save to database
    const trainingPlan = await saveTrainingPlan(
      fastify.prisma,
      params.userId,
      params,
      trainingData
    );

    return trainingPlan;
  } catch (error) {
    fastify.log.error('Error generating training plan:', error);
    throw new Error('Failed to generate training plan');
  }
}

/**
 * Generate prompt for OpenAI based on user profile and request
 */
function generateTrainingPrompt(
  userProfile: any,
  params: GenerateTrainingRequest
): string {
  return `
Create a personalized ${
    params.daysPerWeek
  }-day training plan for a client with the following profile:

- Age: ${userProfile.age || 'Not specified'}
- Weight: ${userProfile.weight || 'Not specified'} kg
- Height: ${userProfile.height || 'Not specified'} cm
- Fitness Level: ${userProfile.fitnessLevel || 'Intermediate'}
- Fitness Goals: ${userProfile.fitnessGoals?.join(', ') || 'General fitness'}
- Medical Issues: ${userProfile.medicalIssues?.join(', ') || 'None'}
- Available Equipment: ${
    userProfile.availableEquipment?.join(', ') || 'Basic gym equipment'
  }
- Training Preferences: ${JSON.stringify(userProfile.trainingPreferences || {})}

The plan should focus on: ${params.focusArea}
Session duration: ${params.sessionDuration} minutes
${params.includeWarmup ? 'Include warm-up exercises' : 'No warm-up needed'}
${
  params.includeCooldown
    ? 'Include cool-down/stretching'
    : 'No cool-down needed'
}

Please output a JSON object with the following structure:
{
  "exercises": [
    {
      "name": "Exercise Name",
      "description": "Brief description of how to perform the exercise",
      "sets": 3,
      "reps": "8-12", // Or specific like "10"
      "restTime": 60, // Rest time in seconds
      "notes": "Any special instructions or modifications",
      "dayOfWeek": 1, // 1-7 representing Monday-Sunday
      "order": 1 // Order within the day's workout
    },
    // More exercises...
  ]
}

The plan should be scientifically sound, follow progressive overload principles, and be suitable for the client's fitness level.
`;
}

/**
 * Save the training plan to the database
 */
async function saveTrainingPlan(
  prisma: PrismaClient,
  userId: string,
  params: GenerateTrainingRequest,
  trainingData: any
): Promise<TrainingPlan> {
  // First create the training plan
  const training = await prisma.trainingPlan.create({
    data: {
      userId,
      name: params.name,
      description: params.description || '',
      generatedBy: 'gpt-4',
      trainingSessions: {
        create: Array.from({ length: params.daysPerWeek }, (_, i) => ({
          userId,
          dayOfWeek: i + 1, // 1-7 representing Monday-Sunday
          completed: false,
        })),
      },
    },
    include: {
      trainingSessions: true,
    },
  });

  // Create exercise logs for each exercise
  const exercisePromises = trainingData.exercises.map(async (exercise: any) => {
    // Find the training session for this day of the week
    const session = training.trainingSessions.find(
      (s) => s.dayOfWeek === exercise.dayOfWeek
    );

    if (!session) return null;

    // Create the exercise log
    return prisma.exerciseLog.create({
      data: {
        userId,
        trainingSessionId: session.id,
        exerciseName: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        feedback: exercise.notes || '',
        weight: null,
        rir: null,
      },
      include: {
        trainingSession: true,
      },
    });
  });

  // Wait for all exercise logs to be created
  const exerciseLogs = await Promise.all(exercisePromises);

  // Map the data to the response format
  return {
    id: training.id,
    userId: training.userId,
    name: training.name,
    description: training.description || undefined,
    exercises: exerciseLogs.filter(Boolean).map((log) => ({
      name: log.exerciseName,
      description: log.feedback || '',
      sets: log.sets,
      reps: log.reps,
      restTime: 60, // Default rest time in seconds
      notes: log.feedback || undefined,
      dayOfWeek: log.trainingSession?.dayOfWeek || 1,
      order: 1, // Default order
    })),
  };
}
