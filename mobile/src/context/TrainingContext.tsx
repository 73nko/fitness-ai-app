import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import grpcClient, {
  TrainingPlanResponse,
  TrainingPlanRequest,
  UpdateTrainingPlanRequest,
  UpdateTrainingPlanResponse,
  ExerciseData,
} from '../services/grpcClient';
import { useAuth } from './AuthContext';

// Training plan storage key
const TRAINING_PLAN_KEY = '@fitness_app:training_plan';

interface TrainingContextType {
  trainingPlan: TrainingPlanResponse | null;
  isLoading: boolean;
  error: string | null;
  setTrainingPlan: (plan: TrainingPlanResponse | null) => void;
  fetchTrainingPlan: () => Promise<TrainingPlanResponse | null>;
  fetchTodaySession: () => Promise<TrainingPlanResponse | null>;
  updateTrainingPlan: (
    planId: string,
    exercises: ExerciseData[]
  ) => Promise<UpdateTrainingPlanResponse | null>;
  clearError: () => void;
}

interface TrainingProviderProps {
  children: React.ReactNode;
}

const TrainingContext = createContext<TrainingContextType>({
  trainingPlan: null,
  isLoading: false,
  error: null,
  setTrainingPlan: () => {},
  fetchTrainingPlan: async () => null,
  fetchTodaySession: async () => null,
  updateTrainingPlan: async () => null,
  clearError: () => {},
});

export const useTraining = () => useContext(TrainingContext);

export function TrainingProvider({ children }: TrainingProviderProps) {
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlanResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  // Load cached training plan on mount
  useEffect(() => {
    const loadCachedTrainingPlan = async () => {
      if (!isAuthenticated) return;

      try {
        const storedPlan = await AsyncStorage.getItem(TRAINING_PLAN_KEY);
        if (storedPlan) {
          const parsedPlan = JSON.parse(storedPlan) as TrainingPlanResponse;
          // Only set the plan if it belongs to the current user
          if (parsedPlan.userId === user?.id) {
            setTrainingPlan(parsedPlan);
          } else {
            // Clear cached plan if it's for a different user
            await AsyncStorage.removeItem(TRAINING_PLAN_KEY);
          }
        }
      } catch (err) {
        console.error('Failed to load cached training plan:', err);
      }
    };

    loadCachedTrainingPlan();
  }, [isAuthenticated, user?.id]);

  // Cache training plan when it changes
  useEffect(() => {
    const cacheTrainingPlan = async () => {
      if (trainingPlan) {
        try {
          await AsyncStorage.setItem(
            TRAINING_PLAN_KEY,
            JSON.stringify(trainingPlan)
          );
        } catch (err) {
          console.error('Failed to cache training plan:', err);
        }
      }
    };

    cacheTrainingPlan();
  }, [trainingPlan]);

  const fetchTrainingPlan = async (): Promise<TrainingPlanResponse | null> => {
    if (!isAuthenticated || !user) {
      setError('User not authenticated');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // For now, we assume the user has a default request
      // This could be enhanced to accept parameters
      const request: TrainingPlanRequest = {
        userId: user.id,
        name: 'My Training Plan',
        description: 'Generated training plan',
        daysPerWeek: 3,
        focusArea: 'general',
        sessionDuration: 60,
        includeWarmup: true,
        includeCooldown: true,
      };

      const response =
        await grpcClient.trainingService.generateTrainingPlan(request);
      setTrainingPlan(response);
      return response;
    } catch (err: any) {
      console.error('Failed to fetch training plan:', err);
      setError(err.message || 'Failed to fetch training plan');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTodaySession = async (): Promise<TrainingPlanResponse | null> => {
    if (!isAuthenticated || !user) {
      setError('User not authenticated');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await grpcClient.trainingService.getTodaySession(
        user.id
      );
      setTrainingPlan(response);
      return response;
    } catch (err: any) {
      console.error("Failed to fetch today's session:", err);
      setError(err.message || "Failed to fetch today's training session");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const updateTrainingPlan = async (
    planId: string,
    exercises: ExerciseData[]
  ): Promise<UpdateTrainingPlanResponse | null> => {
    if (!isAuthenticated || !user) {
      setError('User not authenticated');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: UpdateTrainingPlanRequest = {
        training_plan_id: planId,
        updated_exercises: exercises,
      };

      const response =
        await grpcClient.trainingService.updateTrainingPlan(request);

      // If successful, update the cached plan if it's the current one
      if (response.success && trainingPlan && trainingPlan.id === planId) {
        // Create a new plan with updated exercises
        const updatedPlan = {
          ...trainingPlan,
          exercises: exercises,
          updatedAt: new Date().toISOString(),
        };
        setTrainingPlan(updatedPlan);
      }

      return response;
    } catch (err: any) {
      console.error('Failed to update training plan:', err);
      setError(err.message || 'Failed to update training plan');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TrainingContext.Provider
      value={{
        trainingPlan,
        isLoading,
        error,
        setTrainingPlan,
        fetchTrainingPlan,
        fetchTodaySession,
        updateTrainingPlan,
        clearError,
      }}>
      {children}
    </TrainingContext.Provider>
  );
}
