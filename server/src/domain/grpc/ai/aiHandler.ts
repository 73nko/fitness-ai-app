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

        // Construct the dynamic prompt based on user profile
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

        // Call OpenAI API
        const completionResponse = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                'You are a professional fitness trainer specializing in creating personalized workout plans. Your task is to create a detailed, structured training plan based on the user profile information provided. The output should be in valid JSON format that can be parsed and used in an application.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        });

        // Parse OpenAI response
        const aiResponseContent =
          completionResponse.choices[0]?.message?.content || '{}';
        const planData = parseAIResponse(aiResponseContent);

        // Create the training plan response
        const trainingPlan: TrainingPlan = {
          id: uuidv4(),
          user_id: user_id,
          name: planData.name,
          objective: planData.objective,
          description: planData.description,
          days_per_week: days_per_week,
          sessions: planData.sessions.map(
            (session: AIResponsePlan['sessions'][0]) => ({
              day_of_week: session.day_of_week,
              focus: session.focus,
              exercises: session.exercises.map((exercise) => ({
                name: exercise.name,
                description: exercise.description || '',
                sets: exercise.sets,
                reps: exercise.reps,
                rest_seconds: exercise.rest_seconds || 60,
                notes: exercise.notes,
                order: exercise.order,
              })),
              estimated_duration: session.estimated_duration || 45,
              notes: session.notes,
            })
          ),
          generated_at: new Date().toISOString(),
          model_used: 'gpt-4',
        };

        // Save training plan to database if possible
        try {
          await saveTrainingPlanToDatabase(prisma, trainingPlan);
        } catch (dbError) {
          log.error('Failed to save training plan to database:', dbError);
          // Continue even if saving fails - we still want to return the plan to the user
        }

        return trainingPlan;
      } catch (error) {
        log.error('Error generating training plan:', error);
        throw new Error('Failed to generate training plan');
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

  // Format fitness goals into string
  const goalsString = fitness_goals.join(', ');

  // Format medical issues carefully (if any)
  const medicalString =
    medical_issues.length > 0
      ? `They have the following medical considerations: ${medical_issues.join(
          ', '
        )}.`
      : 'They have no medical issues.';

  // Format equipment availability
  const equipmentString =
    available_equipment.length > 0
      ? `Available equipment: ${available_equipment.join(', ')}.`
      : 'No special equipment available, so bodyweight exercises are preferred.';

  // Create the prompt
  return `
Create a personalized training plan for a user with the following profile:
- Age: ${age}
- Height: ${height} cm
- Weight: ${weight} kg
- Fitness Level: ${fitness_level}
- Fitness Goals: ${goalsString}
- ${medicalString}
- ${equipmentString}
- Available to train ${days_per_week} days per week
${focus_areas ? `- Wants to focus on: ${focus_areas}` : ''}
${
  training_preferences
    ? `- Additional preferences: ${training_preferences}`
    : ''
}

Please design a structured workout plan that includes the following components:
1. A name for the training plan
2. Clear objective
3. Brief description of the overall approach
4. ${days_per_week} training sessions (one for each day)
5. For each session, provide:
   - The day of the week (1-7, where 1 is Monday)
   - Main focus of the session (e.g., "Upper Body", "Lower Body")
   - List of exercises with sets, reps, and rest periods
   - Estimated duration of the session
   - Any special notes or instructions

Your response should be in the following JSON format:
{
  "name": "Plan name",
  "objective": "Main objective",
  "description": "Brief description",
  "sessions": [
    {
      "day_of_week": 1,
      "focus": "Upper Body",
      "estimated_duration": 45,
      "notes": "Optional notes",
      "exercises": [
        {
          "name": "Exercise name",
          "description": "Brief description",
          "sets": 3,
          "reps": "8-12",
          "rest_seconds": 60,
          "notes": "Optional notes",
          "order": 1
        }
      ]
    }
  ]
}

Remember to adapt the exercises to the user's fitness level, goals, and available equipment. Ensure the plan is realistic and sustainable.
`;
}

// Helper function to parse the AI response
function parseAIResponse(response: string): AIResponsePlan {
  try {
    // Extract JSON if it's wrapped in markdown code blocks
    const jsonMatch =
      response.match(/```(?:json)?([\s\S]*?)```/) ||
      response.match(/{[\s\S]*}/);
    const jsonString = jsonMatch
      ? jsonMatch[0].replace(/```json|```/g, '')
      : response;

    // Parse the JSON response
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    // Return a basic structure if parsing fails
    return {
      name: 'Basic Training Plan',
      objective: 'General fitness',
      description: 'A simple training program focusing on full body workouts',
      sessions: [],
    };
  }
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
      description: trainingPlan.description,
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
          weight: null, // User will fill this in when they actually do the workout
          feedback: exercise.notes || null,
        },
      });
    }
  }
}
