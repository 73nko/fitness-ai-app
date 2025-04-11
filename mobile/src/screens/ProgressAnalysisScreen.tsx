import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation';
import { useAuth } from '../context/AuthContext';
import { useTraining } from '../context/TrainingContext';
import grpcClient, {
  ProgressionSuggestionsRequest,
  ProgressionSuggestionsResponse,
  ExerciseModificationSuggestion,
  ExerciseData,
} from '../services/grpcClient';

// Card component for modified exercises
interface SuggestionCardProps {
  suggestion: ExerciseModificationSuggestion;
  isDeloadRecommended: boolean;
}

function SuggestionCard({
  suggestion,
  isDeloadRecommended,
}: SuggestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine suggestion type for badge display
  const getSuggestionType = (): { type: string; color: string } => {
    if (suggestion.replace_with) {
      return { type: 'Replace', color: '#8B5CF6' }; // Purple for replacement
    } else if (suggestion.new_weight) {
      return { type: 'Adjust Weight', color: '#3B82F6' }; // Blue for weight adjustment
    } else if (isDeloadRecommended) {
      return { type: 'Deload', color: '#F59E0B' }; // Amber for deload
    } else {
      return { type: 'Technique', color: '#10B981' }; // Green for technique suggestions
    }
  };

  const suggestionType = getSuggestionType();

  return (
    <TouchableOpacity
      style={styles.suggestionCard}
      onPress={() => setIsExpanded(!isExpanded)}
      activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <Text style={styles.exerciseName}>{suggestion.exercise_id}</Text>
        <View
          style={[
            styles.suggestionTypeBadge,
            {
              backgroundColor: suggestionType.color + '20', // Add transparency
              borderColor: suggestionType.color,
            },
          ]}>
          <Text
            style={[
              styles.suggestionTypeBadgeText,
              { color: suggestionType.color },
            ]}>
            {suggestionType.type}
          </Text>
        </View>
      </View>

      <Text style={styles.suggestionText}>{suggestion.suggestion}</Text>

      {isExpanded && (
        <View style={styles.cardDetails}>
          {suggestion.new_weight && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>New Target Weight:</Text>
              <Text style={styles.detailValue}>{suggestion.new_weight} kg</Text>
            </View>
          )}
          {suggestion.replace_with && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Replace With:</Text>
              <Text style={styles.detailValue}>{suggestion.replace_with}</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.cardFooter}>
        <Text style={styles.expandHint}>
          {isExpanded ? 'Tap to collapse' : 'Tap for details'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

type ProgressAnalysisScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProgressAnalysis'
>;

type ProgressAnalysisScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProgressAnalysis'
>;

// Add this array before the ProgressAnalysisScreen component
const HISTORY_WEEKS_OPTIONS = [
  { label: '2 Weeks', value: 2 },
  { label: '4 Weeks', value: 4 },
  { label: '8 Weeks', value: 8 },
  { label: '12 Weeks', value: 12 },
];

export default function ProgressAnalysisScreen() {
  const navigation = useNavigation<ProgressAnalysisScreenNavigationProp>();
  const route = useRoute<ProgressAnalysisScreenRouteProp>();
  const { user } = useAuth();
  const { trainingPlan, updateTrainingPlan } = useTraining();

  const [analysis, setAnalysis] =
    useState<ProgressionSuggestionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyWeeks, setHistoryWeeks] = useState<number>(4); // Default to 4 weeks history

  // Use the most active training plan or the one from route params
  const trainingPlanId = route.params?.trainingPlanId || '';

  // Function to fetch progression suggestions from API
  const fetchAnalysis = useCallback(
    async (isRefresh = false) => {
      if (!user) return;

      try {
        if (!isRefresh) setIsLoading(true);
        setError(null);

        // Check if we have a training plan ID
        if (!trainingPlanId) {
          throw new Error('No training plan selected');
        }

        // Create the request object according to gRPC format
        const request: ProgressionSuggestionsRequest = {
          user_id: user.id,
          training_plan_id: trainingPlanId,
          history_weeks: historyWeeks,
        };

        // Call the gRPC service directly
        const response =
          await grpcClient.trainingService.generateProgressionSuggestions(
            request
          );

        setAnalysis(response);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analysis');
        console.error('Error fetching progression suggestions:', err);
      } finally {
        setIsLoading(false);
        if (isRefresh) setIsRefreshing(false);
      }
    },
    [user, trainingPlanId, historyWeeks]
  );

  // Initial data load
  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchAnalysis(true);
  }, [fetchAnalysis]);

  // Handle regeneration of analysis
  const handleRegenerateAnalysis = () => {
    Alert.alert(
      'Regenerate Analysis',
      'This will request a new AI analysis of your recent progress. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Regenerate',
          onPress: () => fetchAnalysis(),
        },
      ]
    );
  };

  // Function to apply the suggested changes to the training plan
  const handleApplySuggestions = async () => {
    if (!analysis || !trainingPlan) return;

    // Confirmation alert
    Alert.alert(
      'Apply Suggestions',
      'This will update your training plan with the recommended changes. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Apply',
          onPress: async () => {
            try {
              setIsSaving(true);

              // Get the current exercises from the training plan
              const currentExercises = [...trainingPlan.exercises];

              // Apply the changes from the suggestions
              analysis.modified_exercises.forEach((suggestion) => {
                const exerciseIndex = currentExercises.findIndex(
                  (ex) =>
                    ex.id === suggestion.exercise_id ||
                    ex.name === suggestion.exercise_id
                );

                if (exerciseIndex >= 0) {
                  const exercise = { ...currentExercises[exerciseIndex] };

                  // If there's a weight recommendation, update it
                  if (suggestion.new_weight) {
                    exercise.weight = suggestion.new_weight;
                  }

                  // If there's a replacement exercise, update the name and description
                  if (suggestion.replace_with) {
                    exercise.name = suggestion.replace_with;
                    exercise.description = `Modified from ${currentExercises[exerciseIndex].name} based on progression analysis`;
                  }

                  // Update the exercise in the array
                  currentExercises[exerciseIndex] = exercise;
                }
              });

              // Call the updateTrainingPlan method from context
              const result = await updateTrainingPlan(
                trainingPlanId,
                currentExercises
              );

              if (result?.success) {
                Alert.alert(
                  'Success',
                  'Your training plan has been updated with the suggested changes.',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        // Navigate back to the plan summary with the updated plan
                        navigation.navigate('PlanSummary', {
                          plan: trainingPlan,
                        });
                      },
                    },
                  ]
                );
              } else {
                throw new Error(
                  result?.message || 'Failed to update training plan'
                );
              }
            } catch (err: any) {
              Alert.alert(
                'Error',
                err.message || 'Failed to apply suggestions'
              );
            } finally {
              setIsSaving(false);
            }
          },
        },
      ]
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#3B82F6' />
        <Text style={styles.loadingText}>
          Analyzing your progress data with AI...
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Analysis Error</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => fetchAnalysis()}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Empty state - No analysis data
  if (!analysis) {
    return (
      <ScrollView
        contentContainerStyle={styles.emptyContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        <Text style={styles.emptyTitle}>No Analysis Available</Text>
        <Text style={styles.emptyText}>
          We need more workout data to provide a meaningful analysis. Keep
          logging your workouts!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Progress')}>
          <Text style={styles.buttonText}>Back to Progress</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Format date for display
  const analysisDate = new Date(analysis.generated_at).toLocaleDateString(
    undefined,
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        <View style={styles.header}>
          <Text style={styles.title}>Progress Analysis</Text>
          <Text style={styles.subtitle}>
            AI-generated insights based on {historyWeeks} weeks of data
          </Text>
        </View>

        {/* Summary card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            {analysis.deload_recommended
              ? '⚠️ Deload Recommended'
              : '🎯 Progress Update'}
          </Text>
          <Text style={styles.summaryText}>{analysis.summary}</Text>
          <View style={styles.generatedInfo}>
            <Text style={styles.generatedText}>
              Generated on:{' '}
              {new Date(analysis.generated_at).toLocaleDateString()}
            </Text>
            <Text style={styles.modelText}>Model: {analysis.model_used}</Text>
          </View>
        </View>

        {/* Modified exercises section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suggested Adjustments</Text>
          <Text style={styles.sectionSubtitle}>
            {analysis.modified_exercises.length} exercise
            {analysis.modified_exercises.length !== 1 ? 's' : ''} to modify
          </Text>
        </View>

        {/* Exercise suggestion cards */}
        {analysis.modified_exercises.map((suggestion, index) => (
          <SuggestionCard
            key={`${suggestion.exercise_id}-${index}`}
            suggestion={suggestion}
            isDeloadRecommended={analysis.deload_recommended}
          />
        ))}

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleRegenerateAnalysis}
            disabled={isLoading || isSaving}>
            <Text style={styles.actionButtonText}>Regenerate Analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.primaryButton,
              (isLoading || isSaving) && styles.disabledButton,
            ]}
            onPress={handleApplySuggestions}
            disabled={isLoading || isSaving}>
            {isSaving ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <Text style={styles.actionButtonText}>Apply Suggestions</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 8,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  summaryCard: {
    padding: 16,
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
  },
  generatedInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  generatedText: {
    fontSize: 14,
    color: '#6B7280',
  },
  modelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionHeader: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  suggestionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  suggestionTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  suggestionTypeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  suggestionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
    marginBottom: 12,
  },
  cardDetails: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
    alignItems: 'center',
  },
  expandHint: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  regenerateButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  deloadBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  deloadBadgeText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: 'bold',
  },
  replaceBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  replaceBadgeText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noSuggestionsText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  deloadWarningContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  deloadWarningText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B45309',
    marginBottom: 8,
  },
  deloadWarningIcon: {
    fontSize: 18,
  },
  deloadDescription: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
  noSuggestionsContainer: {
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  actionButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  secondaryButton: {
    backgroundColor: '#E5E7EB',
  },
  disabledButton: {
    opacity: 0.5,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
