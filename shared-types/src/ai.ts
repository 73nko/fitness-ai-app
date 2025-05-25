import { z } from 'zod';

// Corresponds to ai.UserProfile
export const UserProfileSchema = z.object({
  userId: z.string(),
  age: z.number().int(),
  height: z.number(),
  weight: z.number(),
  fitnessLevel: z.string(), // beginner, intermediate, advanced
  fitnessGoals: z.array(z.string()), // ["lose_weight", "build_muscle", etc.]
  medicalIssues: z.array(z.string()),
  availableEquipment: z.array(z.string()),
  trainingPreferences: z.string(), // JSON string for additional preferences
  daysPerWeek: z.number().int(), // Number of days per week the user can train
  focusAreas: z.string().optional(), // Specific body areas to focus on
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

// Corresponds to ai.ExercisePlan
export const AiExercisePlanSchema = z.object({
  name: z.string(),
  description: z.string(),
  sets: z.number().int(),
  reps: z.string(), // Can be a range like "8-12" or specific like "10"
  restSeconds: z.number().int(),
  notes: z.string().optional(),
  order: z.number().int(), // Order within the session
});
export type AiExercisePlan = z.infer<typeof AiExercisePlanSchema>;

// Corresponds to ai.TrainingSession
export const AiTrainingSessionSchema = z.object({
  dayOfWeek: z.number().int(), // 1-7 representing Monday-Sunday
  focus: z.string(), // e.g., "Upper Body", "Lower Body", "Full Body", etc.
  exercises: z.array(AiExercisePlanSchema),
  estimatedDuration: z.number().int(), // In minutes
  notes: z.string().optional(),
});
export type AiTrainingSession = z.infer<typeof AiTrainingSessionSchema>;

// Corresponds to ai.TrainingPlan (distinct from training.TrainingPlan)
export const AiTrainingPlanSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  objective: z.string(),
  description: z.string(),
  daysPerWeek: z.number().int(),
  sessions: z.array(AiTrainingSessionSchema),
  generatedAt: z.string(), // Assuming datetime string
  modelUsed: z.string(),
});
export type AiTrainingPlan = z.infer<typeof AiTrainingPlanSchema>;

// Corresponds to ai.FeedbackRequest
export const AiFeedbackRequestSchema = z.object({
  userId: z.string(),
  trainingId: z.string().optional(),
  startDate: z.string().optional(), // Assuming date string
  endDate: z.string().optional(), // Assuming date string
});
export type AiFeedbackRequest = z.infer<typeof AiFeedbackRequestSchema>;

// Corresponds to ai.ExerciseFeedback (distinct from training.ExerciseFeedback)
export const AiExerciseFeedbackSchema = z.object({
  exerciseId: z.string(),
  exerciseName: z.string(),
  feedback: z.string(),
  suggestion: z.string().optional(),
});
export type AiExerciseFeedback = z.infer<typeof AiExerciseFeedbackSchema>;

// Corresponds to ai.FeedbackResponse
export const AiFeedbackResponseSchema = z.object({
  userId: z.string(),
  feedback: z.string(),
  exerciseFeedback: z.array(AiExerciseFeedbackSchema),
  generatedAt: z.string(), // Assuming datetime string
  modelUsed: z.string(),
});
export type AiFeedbackResponse = z.infer<typeof AiFeedbackResponseSchema>;

// Corresponds to ai.RecommendationRequest
export const AiRecommendationRequestSchema = z.object({
  userId: z.string(),
  trainingId: z.string().optional(),
  focusArea: z.string().optional(),
});
export type AiRecommendationRequest = z.infer<
  typeof AiRecommendationRequestSchema
>;

// Corresponds to ai.ExerciseRecommendation
export const AiExerciseRecommendationSchema = z.object({
  exerciseName: z.string(),
  description: z.string(),
  benefit: z.string(),
  videoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  recommendedSets: z.number().int(),
  recommendedReps: z.string(),
  recommendedRest: z.number().int(),
});
export type AiExerciseRecommendation = z.infer<
  typeof AiExerciseRecommendationSchema
>;

// Corresponds to ai.RecommendationResponse
export const AiRecommendationResponseSchema = z.object({
  userId: z.string(),
  recommendations: z.array(AiExerciseRecommendationSchema),
  generatedAt: z.string(), // Assuming datetime string
  modelUsed: z.string(),
});
export type AiRecommendationResponse = z.infer<
  typeof AiRecommendationResponseSchema
>;

// Corresponds to ai.ProgressAnalysisRequest
export const AiProgressAnalysisRequestSchema = z.object({
  userId: z.string(),
  trainingId: z.string().optional(),
  startDate: z.string().optional(), // Assuming date string
  endDate: z.string().optional(), // Assuming date string
});
export type AiProgressAnalysisRequest = z.infer<
  typeof AiProgressAnalysisRequestSchema
>;

// Corresponds to ai.StrengthAreaAnalysis
export const AiStrengthAreaAnalysisSchema = z.object({
  area: z.string(),
  description: z.string(),
  improvementPercentage: z.number(),
});
export type AiStrengthAreaAnalysis = z.infer<
  typeof AiStrengthAreaAnalysisSchema
>;

// Corresponds to ai.WeaknessAreaAnalysis
export const AiWeaknessAreaAnalysisSchema = z.object({
  area: z.string(),
  description: z.string(),
  suggestion: z.string().optional(),
});
export type AiWeaknessAreaAnalysis = z.infer<
  typeof AiWeaknessAreaAnalysisSchema
>;

// Corresponds to ai.ActionItem
export const AiActionItemSchema = z.object({
  description: z.string(),
  reason: z.string(),
  priority: z.number().int(), // 1-5 scale, 5 being highest priority
});
export type AiActionItem = z.infer<typeof AiActionItemSchema>;

// Corresponds to ai.ProgressAnalysisResponse
export const AiProgressAnalysisResponseSchema = z.object({
  userId: z.string(),
  overallAnalysis: z.string(),
  strengthAreas: z.array(AiStrengthAreaAnalysisSchema),
  weaknessAreas: z.array(AiWeaknessAreaAnalysisSchema),
  actionItems: z.array(AiActionItemSchema),
  generatedAt: z.string(), // Assuming datetime string
  modelUsed: z.string(),
});
export type AiProgressAnalysisResponse = z.infer<
  typeof AiProgressAnalysisResponseSchema
>;
