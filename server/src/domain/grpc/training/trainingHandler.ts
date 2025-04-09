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

const prisma = new PrismaClient();

export interface TrainingHandler {
  GenerateTrainingPlan: UntypedHandleCall;
  RecordWorkout: UntypedHandleCall;
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
};

export default trainingHandler;
