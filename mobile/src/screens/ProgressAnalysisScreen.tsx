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
import grpcClient, {
  ProgressionSuggestionsRequest,
  ProgressionSuggestionsResponse,
  ExerciseModificationSuggestion,
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

  const [analysis, setAnalysis] =
    useState<ProgressionSuggestionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        {/* Header section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>AI Progress Analysis</Text>
            {analysis.deload_recommended && (
              <View style={styles.deloadBadge}>
                <Text style={styles.deloadBadgeText}>Deload Recommended</Text>
              </View>
            )}
          </View>
          <Text style={styles.subtitle}>
            Generated on {analysisDate} · {analysis.model_used}
          </Text>
        </View>

        {/* Summary section */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{analysis.summary}</Text>
        </View>

        {/* History weeks selector */}
        <View style={styles.historyWeeksContainer}>
          <Text style={styles.sectionTitle}>Analysis Timeframe</Text>
          <View style={styles.historyWeeksSelector}>
            {HISTORY_WEEKS_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.historyWeeksOption,
                  historyWeeks === option.value &&
                    styles.historyWeeksOptionSelected,
                ]}
                onPress={() => {
                  setHistoryWeeks(option.value);
                  // Refetch with new history weeks setting
                  fetchAnalysis();
                }}>
                <Text
                  style={[
                    styles.historyWeeksOptionText,
                    historyWeeks === option.value &&
                      styles.historyWeeksOptionTextSelected,
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.historyWeeksDescription}>
            Select the time period to analyze for progression recommendations.
            Longer periods show more trends but may include outdated data.
          </Text>
        </View>

        {/* Exercise suggestions section */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.sectionTitle}>Exercise Suggestions</Text>

          {analysis.deload_recommended && (
            <View style={styles.deloadWarningContainer}>
              <Text style={styles.deloadWarningText}>
                <Text style={styles.deloadWarningIcon}>⚠️</Text> Deload Week
                Recommended
              </Text>
              <Text style={styles.deloadDescription}>
                Your recent training data suggests you may need a deload week.
                Consider reducing intensity by 30-40% while maintaining movement
                patterns.
              </Text>
            </View>
          )}

          {analysis.modified_exercises.length === 0 ? (
            <View style={styles.noSuggestionsContainer}>
              <Text style={styles.noSuggestionsText}>
                No specific exercise modifications recommended at this time.
                Keep up the good work!
              </Text>
            </View>
          ) : (
            analysis.modified_exercises.map((suggestion, index) => (
              <SuggestionCard
                key={`${suggestion.exercise_id}-${index}`}
                suggestion={suggestion}
                isDeloadRecommended={analysis.deload_recommended}
              />
            ))
          )}
        </View>

        {/* Action buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Back to Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRegenerateAnalysis}>
            <Text style={styles.primaryButtonText}>Regenerate Analysis</Text>
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
  headerContainer: {
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  summaryContainer: {
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
  sectionTitle: {
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
  suggestionsContainer: {
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
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#4B5563',
    fontWeight: 'bold',
    fontSize: 16,
  },
  historyWeeksContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyWeeksSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 12,
  },
  historyWeeksOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  historyWeeksOptionSelected: {
    backgroundColor: '#3B82F6',
  },
  historyWeeksOptionText: {
    fontSize: 14,
    color: '#4B5563',
  },
  historyWeeksOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyWeeksDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
});
