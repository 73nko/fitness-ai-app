import { v4 as uuidv4 } from 'uuid';
import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '../../../../generated/prisma';
import OpenAI from 'openai';

// Define tipos directamente (temporalmente hasta que los tipos generados estén disponibles)
interface AIServiceHandlers {
  GenerateFeedback: (request: FeedbackRequest) => Promise<FeedbackResponse>;
  GenerateRecommendations: (
    request: RecommendationRequest
  ) => Promise<RecommendationResponse>;
  AnalyzeProgress: (
    request: ProgressAnalysisRequest
  ) => Promise<ProgressAnalysisResponse>;
  GenerateTrainingPlan: (request: UserProfile) => Promise<TrainingPlan>;
}

interface FeedbackRequest {
  user_id: string;
  training_id?: string;
  start_date?: string;
  end_date?: string;
}

interface FeedbackResponse {
  user_id: string;
  feedback: string;
  exercise_feedback: Array<{
    exercise_id: string;
    exercise_name: string;
    feedback: string;
    suggestion?: string;
  }>;
  generated_at: string;
  model_used: string;
}

interface RecommendationRequest {
  user_id: string;
  training_id?: string;
  focus_area?: string;
}

interface RecommendationResponse {
  user_id: string;
  recommendations: Array<{
    exercise_name: string;
    description: string;
    benefit: string;
    video_url?: string;
    image_url?: string;
    recommended_sets: number;
    recommended_reps: string;
    recommended_rest: number;
  }>;
  generated_at: string;
  model_used: string;
}

interface ProgressAnalysisRequest {
  user_id: string;
  training_id?: string;
  start_date?: string;
  end_date?: string;
}

interface ProgressAnalysisResponse {
  user_id: string;
  overall_analysis: string;
  strength_areas: Array<{
    area: string;
    description: string;
    improvement_percentage: number;
  }>;
  weakness_areas: Array<{
    area: string;
    description: string;
    suggestion?: string;
  }>;
  action_items: Array<{
    description: string;
    reason: string;
    priority: number;
  }>;
  generated_at: string;
  model_used: string;
}

interface UserProfile {
  user_id: string;
  age: number;
  height: number;
  weight: number;
  fitness_level: string;
  fitness_goals: string[];
  medical_issues: string[];
  available_equipment: string[];
  training_preferences: string;
  days_per_week: number;
  focus_areas?: string;
}

interface ExercisePlan {
  name: string;
  description: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  notes?: string;
  order: number;
}

interface TrainingSession {
  day_of_week: number;
  focus: string;
  exercises: ExercisePlan[];
  estimated_duration: number;
  notes?: string;
}

interface TrainingPlan {
  id: string;
  user_id: string;
  name: string;
  objective: string;
  description: string;
  days_per_week: number;
  sessions: TrainingSession[];
  generated_at: string;
  model_used: string;
}

// Tipo para la respuesta de AI que puede tener campos opcionales
type AIResponsePlan = {
  name: string;
  objective: string;
  description: string;
  sessions: {
    day_of_week: number;
    focus: string;
    estimated_duration?: number;
    notes?: string;
    exercises: {
      name: string;
      description?: string;
      sets: number;
      reps: string;
      rest_seconds?: number;
      notes?: string;
      order: number;
    }[];
  }[];
};

// Dependencies for the handler
interface AIHandlerDependencies {
  prisma: PrismaClient;
  openai: OpenAI;
  log: Console;
}

// Exportar la función que crea el handler
export function aiHandler({
  prisma,
  openai,
  log,
}: AIHandlerDependencies): AIServiceHandlers {
  return {
    GenerateFeedback: async (request: FeedbackRequest) => {
      // Implementation for GenerateFeedback
      return {
        user_id: '',
        feedback: '',
        exercise_feedback: [],
        generated_at: '',
        model_used: '',
      };
    },

    GenerateRecommendations: async (request: RecommendationRequest) => {
      // Implementation for GenerateRecommendations
      return {
        user_id: '',
        recommendations: [],
        generated_at: '',
        model_used: '',
      };
    },

    AnalyzeProgress: async (request: ProgressAnalysisRequest) => {
      // Implementation for AnalyzeProgress
      return {
        user_id: '',
        overall_analysis: '',
        strength_areas: [],
        weakness_areas: [],
        action_items: [],
        generated_at: '',
        model_used: '',
      };
    },

    GenerateTrainingPlan: async (request: UserProfile) => {
      try {
        const {
          user_id,
          age,
          height,
          weight,
          fitness_level,
          fitness_goals,
          medical_issues,
          available_equipment,
          training_preferences,
          days_per_week,
          focus_areas,
        } = request;

        // Validate essential input
        if (
          !user_id ||
          !days_per_week ||
          days_per_week < 1 ||
          days_per_week > 7
        ) {
          throw new Error(
            'Invalid user data: user_id and valid days_per_week (1-7) are required'
          );
        }

        // Log the request for debugging
        log.info(
          `Generating training plan for user ${user_id} with ${days_per_week} days per week`
        );

        // Construct the optimized prompt
        const prompt = constructTrainingPlanPrompt({
          user_id,
          age,
          height,
          weight,
          fitness_level,
          fitness_goals,
          medical_issues,
          available_equipment,
          training_preferences,
          days_per_week,
          focus_areas,
        });

        // Call OpenAI API with optimized parameters
        const completionResponse = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert fitness trainer with years of experience creating personalized workout plans. ' +
                'Your task is to create a detailed, well-structured training plan based on the user profile information provided. ' +
                'Structure your response as valid JSON that follows exactly the schema specified in the prompt. ' +
                "Ensure exercises are appropriate for the user's fitness level, medical history, and available equipment. " +
                'Provide detailed descriptions for exercises, accurate set/rep ranges, and realistic rest times. ' +
                'Balance the workout schedule thoughtfully across the week.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7, // Balance between creativity and consistency
          max_tokens: 3000, // Increased for more detailed plans
          response_format: { type: 'json_object' }, // Ensure JSON response
        });

        // Extract and parse the response
        const aiResponseContent =
          completionResponse.choices[0]?.message?.content || '{}';
        log.info(`Received AI response for user ${user_id}`);

        // Parse the AI response with enhanced error handling
        const planData = parseAIResponse(aiResponseContent);

        // Validate the parsed data has required fields
        if (
          !planData.name ||
          !planData.objective ||
          !planData.sessions ||
          planData.sessions.length < 1
        ) {
          throw new Error('AI response missing required training plan fields');
        }

        // Create the training plan response with sanitized data
        const trainingPlan: TrainingPlan = {
          id: uuidv4(),
          user_id,
          name: planData.name.trim(),
          objective: planData.objective.trim(),
          description: planData.description.trim(),
          days_per_week,
          sessions: planData.sessions.map(
            (session: AIResponsePlan['sessions'][0], index: number) => ({
              // Ensure valid day_of_week (1-7) or default based on index
              day_of_week:
                session.day_of_week >= 1 && session.day_of_week <= 7
                  ? session.day_of_week
                  : (index % 7) + 1,
              focus: session.focus.trim(),
              exercises: (session.exercises || []).map((exercise, exIndex) => ({
                name: exercise.name.trim(),
                description: exercise.description?.trim() || '',
                // Ensure positive values for numerical fields
                sets: Math.max(1, exercise.sets || 3),
                reps: exercise.reps || '10',
                rest_seconds: Math.max(30, exercise.rest_seconds || 60),
                notes: exercise.notes?.trim(),
                // Ensure valid order or default to index position
                order: exercise.order || exIndex + 1,
              })),
              // Ensure sensible duration (30-120 minutes)
              estimated_duration: Math.min(
                120,
                Math.max(30, session.estimated_duration || 45)
              ),
              notes: session.notes?.trim(),
            })
          ),
          generated_at: new Date().toISOString(),
          model_used: 'gpt-4',
        };

        // Save training plan to database
        try {
          await saveTrainingPlanToDatabase(prisma, trainingPlan);
          log.info(
            `Successfully saved training plan to database for user ${user_id}`
          );
        } catch (dbError) {
          log.error(
            `Failed to save training plan to database for user ${user_id}:`,
            dbError
          );
          // Continue despite database error - we still want to return the plan to the user
        }

        return trainingPlan;
      } catch (error) {
        log.error('Error generating training plan:', error);
        throw new Error(
          `Failed to generate training plan: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    },
  };
}

// Helper function to construct the prompt
function constructTrainingPlanPrompt(userProfile: UserProfile): string {
  const {
    age,
    height,
    weight,
    fitness_level,
    fitness_goals,
    medical_issues,
    available_equipment,
    training_preferences,
    days_per_week,
    focus_areas,
  } = userProfile;

  // Calculate BMI for additional context
  const bmiValue = weight / ((height / 100) * (height / 100));
  const bmi = bmiValue.toFixed(1);

  // Format fitness goals into string with emphasis on primary goals
  const goalsString =
    fitness_goals.length > 0
      ? fitness_goals.join(', ')
      : 'general fitness improvement';

  // Format medical issues carefully for safety
  const medicalString =
    medical_issues.length > 0
      ? `They have the following medical considerations that must be carefully accounted for in the plan: ${medical_issues.join(
          ', '
        )}.`
      : 'They have no reported medical issues.';

  // Format equipment availability with alternatives suggestion
  const equipmentString =
    available_equipment.length > 0
      ? `Available equipment: ${available_equipment.join(
          ', '
        )}. Design exercises primarily using this equipment.`
      : 'No special equipment available, so focus on bodyweight exercises, or suggest affordable alternatives.';

  // Parse training preferences if it's a JSON string
  let preferencesObj: Record<string, any> = {};
  try {
    if (training_preferences) {
      preferencesObj = JSON.parse(training_preferences);
    }
  } catch (e) {
    // If not valid JSON, use as a string
  }

  // Extract specific preferences if available
  const workoutDuration = preferencesObj.workoutDuration || '45-60 minutes';
  const preferredTime = preferencesObj.preferredTime || 'not specified';
  const preferenceString = training_preferences
    ? typeof preferencesObj === 'object'
      ? `- Preferred workout duration: ${workoutDuration}\n- Preferred workout time: ${preferredTime}\n- Other preferences: ${JSON.stringify(
          preferencesObj
        )}`
      : `- Additional preferences: ${training_preferences}`
    : '';

  // Create the structured prompt with clear instructions
  return `
Create a personalized training plan for the following user profile:

USER PROFILE:
- Age: ${age} years
- Height: ${height} cm
- Weight: ${weight} kg
- BMI: ${bmi}
- Fitness Level: ${fitness_level}
- Fitness Goals: ${goalsString}
${medicalString}
${equipmentString}
- Available to train ${days_per_week} days per week
${focus_areas ? `- Wants to focus on these specific areas: ${focus_areas}` : ''}
${preferenceString ? preferenceString : ''}

REQUIREMENTS:
Design a structured workout plan with exactly ${days_per_week} training sessions that:
1. Aligns with their fitness level (${fitness_level})
2. Addresses their primary goals (${goalsString})
3. Respects any medical considerations
4. Utilizes available equipment effectively
5. Provides variety to maintain motivation
6. Includes proper warm-up and cool-down guidance
7. Balances intensity throughout the week

RESPONSE FORMAT:
Your response must be a valid JSON object with the following structure:

{
  "name": "Name of the training plan",
  "objective": "Clear primary objective of the plan",
  "description": "2-3 sentence overview of the approach and expected results",
  "sessions": [
    {
      "day_of_week": 1,  // Number from 1-7 where 1=Monday
      "focus": "Main focus of this session (e.g., 'Upper Body', 'HIIT')",
      "estimated_duration": 45,  // Duration in minutes
      "notes": "Optional guidance or instructions for the session",
      "exercises": [
        {
          "name": "Name of exercise",
          "description": "Brief description of how to perform it correctly",
          "sets": 3,  // Number of sets
          "reps": "8-12",  // Number or range of repetitions
          "rest_seconds": 60,  // Rest time between sets in seconds
          "notes": "Optional form tips or variations",
          "order": 1  // Order of exercise in the session
        },
        // Additional exercises...
      ]
    },
    // Additional sessions up to the user's days_per_week...
  ]
}

IMPORTANT GUIDELINES:
- Create exactly ${days_per_week} training sessions
- For a ${fitness_level} fitness level, include appropriate exercise complexity
- Balance muscle groups throughout the week to allow for recovery
- Include proper progression mechanisms
- Ensure exercise selections address the main goals: ${goalsString}
${
  medical_issues.length > 0
    ? '- Adapt exercises to accommodate their medical considerations'
    : ''
}
${
  available_equipment.length > 0
    ? '- Primarily use the equipment they have available'
    : '- Focus on bodyweight exercises that require minimal equipment'
}

The response must be in valid JSON format that can be parsed directly.
`;
}

// Helper function to parse the AI response
function parseAIResponse(response: string): AIResponsePlan {
  try {
    // First, try to parse as direct JSON
    try {
      return JSON.parse(response);
    } catch (directError) {
      // If direct parsing fails, try to extract JSON from markdown

      // Check for JSON code blocks
      const jsonMatch =
        response.match(/```(?:json)?([\s\S]*?)```/) ||
        response.match(/```([\s\S]*?)```/);

      if (jsonMatch && jsonMatch[1]) {
        // Try parsing content of code block
        try {
          return JSON.parse(jsonMatch[1].trim());
        } catch (blockError) {
          // Fall through to next method
        }
      }

      // Try to find content that looks like JSON object
      const objectMatch = response.match(/{[\s\S]*}/);
      if (objectMatch) {
        try {
          return JSON.parse(objectMatch[0]);
        } catch (objectError) {
          // Fall through to default response
        }
      }

      // If all parsing attempts fail, log the issue and return fallback
      console.error(
        'Failed to parse AI response - no valid JSON found:',
        response.substring(0, 200) + '...'
      );
      return createFallbackPlan();
    }
  } catch (error) {
    console.error('Critical error parsing AI response:', error);
    return createFallbackPlan();
  }
}

// Helper function to create a fallback plan when parsing fails
function createFallbackPlan(): AIResponsePlan {
  return {
    name: 'Basic Fitness Plan',
    objective: 'General fitness maintenance',
    description:
      'A simple training program focusing on full body workouts with minimal equipment',
    sessions: [
      {
        day_of_week: 1,
        focus: 'Full Body Basics',
        estimated_duration: 45,
        exercises: [
          {
            name: 'Push-ups',
            description: 'Standard push-ups or from knees if needed',
            sets: 3,
            reps: '8-12',
            rest_seconds: 60,
            order: 1,
          },
          {
            name: 'Bodyweight Squats',
            description: 'Standard squats with proper form',
            sets: 3,
            reps: '10-15',
            rest_seconds: 60,
            order: 2,
          },
          {
            name: 'Plank',
            description: 'Hold for time with proper form',
            sets: 3,
            reps: '30-45 seconds',
            rest_seconds: 60,
            order: 3,
          },
        ],
      },
    ],
  };
}

// Helper function to save the training plan to the database
async function saveTrainingPlanToDatabase(
  prisma: PrismaClient,
  trainingPlan: TrainingPlan
): Promise<void> {
  // Create TrainingPlan record
  const dbTrainingPlan = await prisma.trainingPlan.create({
    data: {
      id: trainingPlan.id,
      userId: trainingPlan.user_id,
      name: trainingPlan.name,
      description: trainingPlan.description || '',
      isActive: true,
      generatedBy: trainingPlan.model_used,
    },
  });

  // Create TrainingSession records for each session
  for (const session of trainingPlan.sessions) {
    const dbTrainingSession = await prisma.trainingSession.create({
      data: {
        trainingPlanId: dbTrainingPlan.id,
        userId: trainingPlan.user_id,
        dayOfWeek: session.day_of_week,
        feedback: session.notes || null,
        completed: false,
      },
    });

    // Create ExerciseLog records for each exercise in the session
    for (const exercise of session.exercises) {
      await prisma.exerciseLog.create({
        data: {
          trainingSessionId: dbTrainingSession.id,
          userId: trainingPlan.user_id,
          exerciseName: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: null, // User will fill this in when they do the workout
          feedback: exercise.notes || null,
        },
      });
    }
  }
}
