import grpcClient from './grpcClient';

export interface ProgressionSuggestionsRequest {
  user_id: string;
  training_plan_id: string;
  history_weeks: number;
}

export interface ExerciseModificationSuggestion {
  exercise_id: string;
  suggestion: string;
  new_weight?: number;
  replace_with?: string;
}

export interface ProgressionSuggestionsResponse {
  training_plan_id: string;
  deload_recommended: boolean;
  summary: string;
  modified_exercises: ExerciseModificationSuggestion[];
  generated_at: string;
  model_used: string;
}

interface GetProgressionSuggestionsParams {
  userId: string;
  trainingPlanId: string;
  historyWeeks?: number;
}

/**
 * Get AI-generated progression suggestions for a user's training plan
 */
export async function getProgressionSuggestions({
  userId,
  trainingPlanId,
  historyWeeks = 4, // Default to 4 weeks of history
}: GetProgressionSuggestionsParams): Promise<ProgressionSuggestionsResponse> {
  const request: ProgressionSuggestionsRequest = {
    user_id: userId,
    training_plan_id: trainingPlanId,
    history_weeks: historyWeeks,
  };

  return await grpcClient.trainingService.generateProgressionSuggestions(
    request
  );
}
