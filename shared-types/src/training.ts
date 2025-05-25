import { z } from 'zod';

// Corresponds to training.Exercise
export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  sets: z.number().int(),
  reps: z.string(), // Can be a range like "8-12" or specific like "10"
  restTime: z.number().int().optional(), // Rest time in seconds
  weight: z.number().optional(), // Weight used (if applicable)
  notes: z.string().optional(),
  dayOfWeek: z.number().int(), // 1-7 representing Monday-Sunday
  order: z.number().int(), // Order within the day
});
export type Exercise = z.infer<typeof ExerciseSchema>;

// Corresponds to training.TrainingPlan
export const TrainingPlanSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(), // Assuming datetime string
  updatedAt: z.string(), // Assuming datetime string
  isActive: z.boolean(),
  generatedBy: z.string(),
  exercises: z.array(ExerciseSchema),
});
export type TrainingPlan = z.infer<typeof TrainingPlanSchema>;

// Corresponds to training.GeneratePlanRequest
export const GeneratePlanRequestSchema = z.object({
  userId: z.string(),
  planName: z.string().optional(),
  description: z.string().optional(),
});
export type GeneratePlanRequest = z.infer<typeof GeneratePlanRequestSchema>;

// Corresponds to training.TrainingPlanRequest
export const TrainingPlanRequestSchema = z.object({
  trainingId: z.string(),
});
export type TrainingPlanRequest = z.infer<typeof TrainingPlanRequestSchema>;

// Corresponds to training.TrainingPlanResponse
export const TrainingPlanResponseSchema = z.object({
  trainingPlan: TrainingPlanSchema,
});
export type TrainingPlanResponse = z.infer<typeof TrainingPlanResponseSchema>;

// Corresponds to training.ExerciseRecord
export const ExerciseRecordSchema = z.object({
  exerciseId: z.string(),
  exerciseName: z.string(),
  completedSets: z.number().int(),
  completedReps: z.array(z.string()), // Array of reps for each set, e.g. ["10", "8", "6"]
  weight: z.number().optional(),
  notes: z.string().optional(),
});
export type ExerciseRecord = z.infer<typeof ExerciseRecordSchema>;

// Corresponds to training.WorkoutRecordRequest
export const WorkoutRecordRequestSchema = z.object({
  userId: z.string(),
  trainingId: z.string(),
  dayOfWeek: z.number().int(),
  exerciseRecords: z.array(ExerciseRecordSchema),
  workoutDate: z.string(), // Assuming date string
  notes: z.string().optional(),
});
export type WorkoutRecordRequest = z.infer<typeof WorkoutRecordRequestSchema>;

// Corresponds to training.WorkoutRecordResponse
export const WorkoutRecordResponseSchema = z.object({
  recordId: z.string(),
  userId: z.string(),
  trainingId: z.string(),
  workoutDate: z.string(), // Assuming date string
  exerciseRecords: z.array(ExerciseRecordSchema),
  notes: z.string().optional(),
});
export type WorkoutRecordResponse = z.infer<typeof WorkoutRecordResponseSchema>;

// Corresponds to training.ProgressRequest
export const ProgressRequestSchema = z.object({
  userId: z.string(),
  trainingId: z.string().optional(),
  startDate: z.string().optional(), // Assuming date string
  endDate: z.string().optional(), // Assuming date string
});
export type ProgressRequest = z.infer<typeof ProgressRequestSchema>;

// Corresponds to training.WorkoutSummary
export const WorkoutSummarySchema = z.object({
  workoutDate: z.string(), // Assuming date string
  dayOfWeek: z.number().int(),
  totalExercises: z.number().int(),
  totalSets: z.number().int(),
  notes: z.string().optional(),
});
export type WorkoutSummary = z.infer<typeof WorkoutSummarySchema>;

// Corresponds to training.ProgressPoint
export const ProgressPointSchema = z.object({
  date: z.string(), // Assuming date string
  weight: z.number().optional(),
  totalSets: z.number().int().optional(),
  totalReps: z.number().int().optional(),
});
export type ProgressPoint = z.infer<typeof ProgressPointSchema>;

// Corresponds to training.ExerciseProgress
export const ExerciseProgressSchema = z.object({
  exerciseId: z.string(),
  exerciseName: z.string(),
  progressPoints: z.array(ProgressPointSchema),
});
export type ExerciseProgress = z.infer<typeof ExerciseProgressSchema>;

// Corresponds to training.ProgressResponse
export const ProgressResponseSchema = z.object({
  userId: z.string(),
  workouts: z.array(WorkoutSummarySchema),
  exerciseProgress: z.array(ExerciseProgressSchema),
});
export type ProgressResponse = z.infer<typeof ProgressResponseSchema>;

// Corresponds to training.ExerciseFeedback (used in SubmitSessionFeedbackRequest)
export const TrainingExerciseFeedbackSchema = z.object({
  // Renamed to avoid conflict with ai.ExerciseFeedback if used in same context
  exerciseName: z.string(),
  reps: z.string(),
  weight: z.number(),
  rir: z.number().int(),
  notes: z.string(),
});
export type TrainingExerciseFeedback = z.infer<
  typeof TrainingExerciseFeedbackSchema
>;

// Corresponds to training.SubmitSessionFeedbackRequest
export const SubmitSessionFeedbackRequestSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  exercisesFeedback: z.array(TrainingExerciseFeedbackSchema),
});
export type SubmitSessionFeedbackRequest = z.infer<
  typeof SubmitSessionFeedbackRequestSchema
>;

// Corresponds to training.SubmitSessionFeedbackResponse
export const SubmitSessionFeedbackResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SubmitSessionFeedbackResponse = z.infer<
  typeof SubmitSessionFeedbackResponseSchema
>;

// Corresponds to training.ProgressionSuggestionsRequest
export const ProgressionSuggestionsRequestSchema = z.object({
  userId: z.string(),
  trainingPlanId: z.string(),
  historyWeeks: z.number().int(), // Number of weeks of history to analyze (2-4 typically)
});
export type ProgressionSuggestionsRequest = z.infer<
  typeof ProgressionSuggestionsRequestSchema
>;

// Corresponds to training.ExerciseModificationSuggestion
export const ExerciseModificationSuggestionSchema = z.object({
  exerciseId: z.string(),
  suggestion: z.string(),
  newWeight: z.number(),
  replaceWith: z.string(), // Consider if this should be optional or have a specific format
});
export type ExerciseModificationSuggestion = z.infer<
  typeof ExerciseModificationSuggestionSchema
>;

// Corresponds to training.ProgressionSuggestionsResponse
export const ProgressionSuggestionsResponseSchema = z.object({
  trainingPlanId: z.string(),
  deloadRecommended: z.boolean(),
  summary: z.string(),
  modifiedExercises: z.array(ExerciseModificationSuggestionSchema),
  generatedAt: z.string(), // Assuming datetime string
  modelUsed: z.string(),
});
export type ProgressionSuggestionsResponse = z.infer<
  typeof ProgressionSuggestionsResponseSchema
>;

// Corresponds to training.UpdateTrainingPlanRequest
export const UpdateTrainingPlanRequestSchema = z.object({
  trainingPlanId: z.string(),
  updatedExercises: z.array(ExerciseSchema),
});
export type UpdateTrainingPlanRequest = z.infer<
  typeof UpdateTrainingPlanRequestSchema
>;

// Corresponds to training.UpdateTrainingPlanResponse
export const UpdateTrainingPlanResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type UpdateTrainingPlanResponse = z.infer<
  typeof UpdateTrainingPlanResponseSchema
>;
