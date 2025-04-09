import { PrismaClient } from '../../../../generated/prisma';
import { UntypedHandleCall } from '@grpc/grpc-js';
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';

// Types that would normally be imported from the generated proto files
// These are placeholders until the actual generated types are available
interface GeneratePlanRequest {
  user_id: string;
  plan_name?: string;
  description?: string;
}

interface TrainingPlanResponse {
  training_plan: TrainingPlan;
}

interface TrainingPlan {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  generated_by: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  description?: string;
  sets: number;
  reps: string;
  rest_time?: number;
  notes?: string;
  day_of_week: number;
  order: number;
}

interface WorkoutRecordRequest {
  user_id: string;
  training_id: string;
  day_of_week: number;
  exercise_records: ExerciseRecord[];
  workout_date: string;
  notes?: string;
}

interface ExerciseRecord {
  exercise_id?: string;
  exercise_name: string;
  completed_sets: number;
  completed_reps: string[];
  weight?: number;
  notes?: string;
}

interface WorkoutRecordResponse {
  record_id: string;
  user_id: string;
  training_id: string;
  workout_date: string;
  exercise_records: ExerciseRecord[];
  notes?: string;
}

// Interface for Exercise Feedback
interface ExerciseFeedbackInput {
  exercise_name: string;
  reps: string;
  weight: number;
  rir: number;
  notes?: string;
}

// Interface for Session Feedback Request
interface SubmitSessionFeedbackRequest {
  user_id: string;
  session_id: string;
  exercises_feedback: ExerciseFeedbackInput[];
}

// Interface for Session Feedback Response
interface SubmitSessionFeedbackResponse {
  success: boolean;
  message: string;
}

// Interface for Progression Suggestions Request
interface ProgressionSuggestionsRequest {
  user_id: string;
  training_plan_id: string;
  history_weeks: number;
}

// Interface for Exercise Modification Suggestion
interface ExerciseModificationSuggestion {
  exercise_id: string;
  suggestion: string;
  new_weight?: number;
  replace_with?: string;
}

// Interface for Progression Suggestions Response
interface ProgressionSuggestionsResponse {
  training_plan_id: string;
  deload_recommended: boolean;
  summary: string;
  modified_exercises: ExerciseModificationSuggestion[];
  generated_at: string;
  model_used: string;
}

const prisma = new PrismaClient();

export interface TrainingHandler {
  GenerateTrainingPlan: UntypedHandleCall;
  RecordWorkout: UntypedHandleCall;
  SubmitSessionFeedback: UntypedHandleCall;
  GenerateProgressionSuggestions: UntypedHandleCall;
}

/**
 * Handler for the gRPC TrainingService
 */
export const trainingHandler: TrainingHandler = {
  /**
   * Generate a training plan for a user
   */
  GenerateTrainingPlan: async (
    call: ServerUnaryCall<GeneratePlanRequest, TrainingPlanResponse>,
    callback: sendUnaryData<TrainingPlanResponse>
  ) => {
    try {
      const { user_id, plan_name, description } = call.request;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return callback({
          code: 5, // NOT_FOUND
          message: 'User not found',
        });
      }

      // Create a new training plan
      const trainingPlan = await prisma.trainingPlan.create({
        data: {
          userId: user_id,
          name: plan_name || 'Custom Training Plan',
          description: description || 'Generated training plan',
          generatedBy: 'gpt-4', // Default AI model
        },
      });

      // Here you would typically call an AI service to generate the actual plan
      // For now, we'll just create some placeholder training sessions for the week
      const weekdays = [1, 2, 3, 4, 5, 6, 7]; // 1-7 for Monday-Sunday
      const trainingSessions = await Promise.all(
        weekdays.map(async (day) => {
          return prisma.trainingSession.create({
            data: {
              trainingPlanId: trainingPlan.id,
              userId: user_id,
              dayOfWeek: day,
              feedback: null,
              completed: false,
            },
          });
        })
      );

      // Format the response
      const response: TrainingPlanResponse = {
        training_plan: {
          id: trainingPlan.id,
          user_id: trainingPlan.userId,
          name: trainingPlan.name,
          description: trainingPlan.description || undefined,
          created_at: trainingPlan.createdAt.toISOString(),
          updated_at: trainingPlan.updatedAt.toISOString(),
          is_active: trainingPlan.isActive,
          generated_by: trainingPlan.generatedBy,
          exercises: [], // No exercises yet, these would be added by the AI service
        },
      };

      callback(null, response);
    } catch (error) {
      console.error('Error in GenerateTrainingPlan:', error);
      callback({
        code: 13, // INTERNAL
        message: 'An internal error occurred',
      });
    }
  },

  /**
   * Record a workout session
   */
  RecordWorkout: async (
    call: ServerUnaryCall<WorkoutRecordRequest, WorkoutRecordResponse>,
    callback: sendUnaryData<WorkoutRecordResponse>
  ) => {
    try {
      const {
        user_id,
        training_id,
        day_of_week,
        exercise_records,
        workout_date,
        notes,
      } = call.request;

      // Check if user and training plan exist
      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return callback({
          code: 5, // NOT_FOUND
          message: 'User not found',
        });
      }

      const trainingPlan = await prisma.trainingPlan.findUnique({
        where: { id: training_id },
      });

      if (!trainingPlan) {
        return callback({
          code: 5, // NOT_FOUND
          message: 'Training plan not found',
        });
      }

      // Find or create the training session for this day
      let trainingSession = await prisma.trainingSession.findFirst({
        where: {
          trainingPlanId: training_id,
          userId: user_id,
          dayOfWeek: day_of_week,
        },
      });

      if (!trainingSession) {
        trainingSession = await prisma.trainingSession.create({
          data: {
            trainingPlanId: training_id,
            userId: user_id,
            dayOfWeek: day_of_week,
            feedback: notes || null,
            completed: true,
            completedDate: new Date(workout_date),
          },
        });
      } else {
        // Update the existing session
        trainingSession = await prisma.trainingSession.update({
          where: { id: trainingSession.id },
          data: {
            feedback: notes || trainingSession.feedback,
            completed: true,
            completedDate: new Date(workout_date),
          },
        });
      }

      // Create exercise logs
      const exerciseLogs = await Promise.all(
        exercise_records.map(async (record: ExerciseRecord) => {
          return prisma.exerciseLog.create({
            data: {
              trainingSessionId: trainingSession!.id,
              userId: user_id,
              exerciseName: record.exercise_name,
              sets: record.completed_sets,
              reps: record.completed_reps.join(', '), // Join array into string
              weight: record.weight,
              feedback: record.notes || null,
            },
          });
        })
      );

      // Format the response
      const response: WorkoutRecordResponse = {
        record_id: trainingSession.id,
        user_id: user_id,
        training_id: training_id,
        workout_date: workout_date,
        exercise_records: exercise_records,
        notes: notes || undefined,
      };

      callback(null, response);
    } catch (error) {
      console.error('Error in RecordWorkout:', error);
      callback({
        code: 13, // INTERNAL
        message: 'An internal error occurred',
      });
    }
  },

  /**
   * Submit feedback for a completed training session
   */
  SubmitSessionFeedback: async (
    call: ServerUnaryCall<
      SubmitSessionFeedbackRequest,
      SubmitSessionFeedbackResponse
    >,
    callback: sendUnaryData<SubmitSessionFeedbackResponse>
  ) => {
    try {
      const { user_id, session_id, exercises_feedback } = call.request;

      // Validate that session exists and belongs to the user
      const trainingSession = await prisma.trainingSession.findFirst({
        where: {
          id: session_id,
          userId: user_id,
        },
      });

      if (!trainingSession) {
        return callback({
          code: 5, // NOT_FOUND
          message: 'Training session not found or does not belong to this user',
        });
      }

      // Process each exercise feedback
      const updatePromises = exercises_feedback.map(async (feedback) => {
        // Find the exercise log by session and exercise name
        const exerciseLog = await prisma.exerciseLog.findFirst({
          where: {
            trainingSessionId: session_id,
            userId: user_id,
            exerciseName: feedback.exercise_name,
          },
        });

        if (!exerciseLog) {
          console.error(
            `Exercise log not found for ${feedback.exercise_name} in session ${session_id}`
          );
          return null;
        }

        // Update the exercise log with feedback data
        return prisma.exerciseLog.update({
          where: { id: exerciseLog.id },
          data: {
            reps: feedback.reps,
            weight: feedback.weight,
            rir: feedback.rir,
            feedback: feedback.notes || exerciseLog.feedback,
          },
        });
      });

      // Wait for all updates to complete
      const results = await Promise.all(updatePromises);

      // Count successful updates
      const successfulUpdates = results.filter(Boolean).length;

      // Mark the session as completed if it wasn't already
      if (!trainingSession.completed) {
        await prisma.trainingSession.update({
          where: { id: session_id },
          data: {
            completed: true,
            completedDate: new Date(),
          },
        });
      }

      // Prepare the response
      const response: SubmitSessionFeedbackResponse = {
        success: successfulUpdates > 0,
        message:
          successfulUpdates > 0
            ? `Successfully updated ${successfulUpdates} exercise logs`
            : 'No exercise logs were updated',
      };

      callback(null, response);
    } catch (error) {
      console.error('Error in SubmitSessionFeedback:', error);
      callback({
        code: 13, // INTERNAL
        message: 'An internal error occurred',
      });
    }
  },

  /**
   * Generate progression suggestions based on user's exercise history
   */
  GenerateProgressionSuggestions: async (
    call: ServerUnaryCall<
      ProgressionSuggestionsRequest,
      ProgressionSuggestionsResponse
    >,
    callback: sendUnaryData<ProgressionSuggestionsResponse>
  ) => {
    try {
      const { user_id, training_plan_id, history_weeks } = call.request;

      // Check if user and training plan exist
      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return callback({
          code: 5, // NOT_FOUND
          message: 'User not found',
        });
      }

      const trainingPlan = await prisma.trainingPlan.findUnique({
        where: { id: training_plan_id },
        include: {
          trainingSessions: {
            include: {
              exerciseLogs: true,
            },
          },
        },
      });

      if (!trainingPlan) {
        return callback({
          code: 5, // NOT_FOUND
          message: 'Training plan not found',
        });
      }

      // Calculate date range for the history analysis
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - history_weeks * 7);

      // Get exercise logs for the specified period
      const exerciseLogs = await prisma.exerciseLog.findMany({
        where: {
          userId: user_id,
          trainingSession: {
            trainingPlanId: training_plan_id,
          },
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      // Get user profile for additional context
      const userProfile = await prisma.profile.findUnique({
        where: { userId: user_id },
      });

      // Group logs by exercise
      const exerciseHistoryMap = new Map();

      exerciseLogs.forEach((log) => {
        if (!exerciseHistoryMap.has(log.exerciseName)) {
          exerciseHistoryMap.set(log.exerciseName, []);
        }
        exerciseHistoryMap.get(log.exerciseName).push({
          date: log.createdAt,
          sets: log.sets,
          reps: log.reps,
          weight: log.weight,
          rir: log.rir,
          feedback: log.feedback,
        });
      });

      // Convert map to array for prompt construction
      const exerciseHistoryArray = Array.from(exerciseHistoryMap.entries()).map(
        ([name, logs]) => ({
          exercise_name: name,
          history: logs,
        })
      );

      // Construct a prompt for OpenAI to analyze the exercise history
      const prompt = constructProgressionPrompt({
        userId: user_id,
        trainingPlanId: training_plan_id,
        userProfile,
        exerciseHistory: exerciseHistoryArray,
        trainingPlan,
      });

      // Import OpenAI here to avoid circular dependencies
      const OpenAI = require('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content:
              "You are a professional strength coach and exercise physiologist. Analyze the user's exercise history and provide specific progression suggestions.",
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      });

      // Parse the response
      const aiResponse = parseAIResponse(
        completion.choices[0]?.message?.content || '{}'
      );

      // Format the response
      const response: ProgressionSuggestionsResponse = {
        training_plan_id: training_plan_id,
        deload_recommended: aiResponse.deload_recommended || false,
        summary:
          aiResponse.summary ||
          'No specific recommendations at this time. Continue with your current plan.',
        modified_exercises:
          aiResponse.exercise_modifications?.map((modification) => ({
            exercise_id: modification.exercise_id,
            suggestion: modification.suggestion,
            new_weight: modification.new_weight,
            replace_with: modification.replace_with,
          })) || [],
        generated_at: new Date().toISOString(),
        model_used: 'gpt-4-turbo',
      };

      callback(null, response);
    } catch (error) {
      console.error('Error in GenerateProgressionSuggestions:', error);
      callback({
        code: 13, // INTERNAL
        message: 'An internal error occurred',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  },
};

/**
 * Construct the prompt for OpenAI to analyze exercise history and suggest progressions
 */
function constructProgressionPrompt(data: {
  userId: string;
  trainingPlanId: string;
  userProfile: any;
  exerciseHistory: Array<{
    exercise_name: string;
    history: Array<{
      date: Date;
      sets: number;
      reps: string;
      weight?: number | null;
      rir?: number | null;
      feedback?: string | null;
    }>;
  }>;
  trainingPlan: any;
}): string {
  const { userId, trainingPlanId, userProfile, exerciseHistory, trainingPlan } =
    data;

  // Format the exercise history for readability
  const formattedExerciseHistory = exerciseHistory.map((exercise) => {
    const historyEntries = exercise.history.map((entry) => {
      return {
        date: entry.date.toISOString().split('T')[0],
        sets: entry.sets,
        reps: entry.reps,
        weight: entry.weight || 'bodyweight',
        rir: entry.rir !== null ? entry.rir : 'not recorded',
        feedback: entry.feedback || 'no feedback',
      };
    });

    return {
      exercise_name: exercise.exercise_name,
      history: historyEntries,
    };
  });

  // Create a structured prompt
  return `
# Exercise Progression Analysis

## User Information
- User ID: ${userId}
- Training Plan ID: ${trainingPlanId}
- Fitness Level: ${userProfile?.fitnessLevel || 'Unknown'}
- Fitness Goals: ${JSON.stringify(userProfile?.fitnessGoals || [])}
- Medical Issues: ${JSON.stringify(userProfile?.medicalIssues || [])}

## Training Plan Information
- Name: ${trainingPlan.name}
- Description: ${trainingPlan.description || 'No description'}
- Created: ${trainingPlan.createdAt.toISOString().split('T')[0]}
- Is Active: ${trainingPlan.isActive}

## Exercise History (Last ${
    formattedExerciseHistory[0]?.history.length || 0
  } Sessions)
${JSON.stringify(formattedExerciseHistory, null, 2)}

## Analysis Request
Based on the exercise history provided:

1. Analyze each exercise's progression pattern.
2. Identify signs of plateaus, fatigue, or untapped potential.
3. Suggest specific modifications for each exercise that needs changes.
4. If appropriate, recommend deload for the entire routine or specific exercises.
5. Provide an overall summary of recommended changes.

Please return your analysis in the following JSON format:
{
  "deload_recommended": boolean,
  "summary": "Overall summary of the analysis and recommendations",
  "exercise_modifications": [
    {
      "exercise_id": "exercise_name (as identifier)",
      "suggestion": "Detailed explanation of what to change",
      "new_weight": optional_new_weight_recommendation_numeric,
      "replace_with": "optional_replacement_exercise"
    }
  ]
}
`;
}

/**
 * Parse the AI response to extract progression suggestions
 */
function parseAIResponse(response: string): {
  deload_recommended?: boolean;
  summary?: string;
  exercise_modifications?: Array<{
    exercise_id: string;
    suggestion: string;
    new_weight?: number;
    replace_with?: string;
  }>;
} {
  try {
    // Parse the JSON response
    const parsedResponse = JSON.parse(response);

    // Basic validation
    if (typeof parsedResponse !== 'object') {
      console.error('Invalid response format: not an object');
      return createFallbackResponse();
    }

    // Return the parsed response
    return {
      deload_recommended: !!parsedResponse.deload_recommended,
      summary:
        parsedResponse.summary || 'No specific recommendations at this time.',
      exercise_modifications: Array.isArray(
        parsedResponse.exercise_modifications
      )
        ? parsedResponse.exercise_modifications
        : [],
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return createFallbackResponse();
  }
}

/**
 * Create a fallback response for when AI parsing fails
 */
function createFallbackResponse() {
  return {
    deload_recommended: false,
    summary:
      'Unable to generate specific recommendations at this time. Please continue with your current plan and consult with a fitness professional if needed.',
    exercise_modifications: [],
  };
}

// Export the training handler
export default trainingHandler;
