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
import {
  getProgressionSuggestions,
  ProgressionSuggestionsResponse,
  ExerciseModificationSuggestion,
} from '../services/progressService';

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

  return (
    <TouchableOpacity
      style={styles.suggestionCard}
      onPress={() => setIsExpanded(!isExpanded)}
      activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <Text style={styles.exerciseName}>{suggestion.exercise_id}</Text>
        {suggestion.replace_with && (
          <View style={styles.replaceBadge}>
            <Text style={styles.replaceBadgeText}>Replace</Text>
          </View>
        )}
        {isDeloadRecommended && (
          <View style={styles.deloadBadge}>
            <Text style={styles.deloadBadgeText}>Deload</Text>
          </View>
        )}
      </View>

      <Text style={styles.suggestionText}>{suggestion.suggestion}</Text>

      {isExpanded && (
        <View style={styles.cardDetails}>
          {suggestion.new_weight && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Recommended Weight:</Text>
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

      <Text style={styles.expandHint}>
        {isExpanded ? 'Tap to collapse' : 'Tap to expand'}
      </Text>
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

export default function ProgressAnalysisScreen() {
  const navigation = useNavigation<ProgressAnalysisScreenNavigationProp>();
  const route = useRoute<ProgressAnalysisScreenRouteProp>();
  const { user } = useAuth();

  const [analysis, setAnalysis] =
    useState<ProgressionSuggestionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

        const response = await getProgressionSuggestions({
          userId: user.id,
          trainingPlanId,
        });

        setAnalysis(response);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analysis');
        console.error('Error fetching progression suggestions:', err);
      } finally {
        setIsLoading(false);
        if (isRefresh) setIsRefreshing(false);
      }
    },
    [user, trainingPlanId]
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

        {/* Exercise suggestions section */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.sectionTitle}>Exercise Recommendations</Text>
          {analysis.modified_exercises.length === 0 ? (
            <Text style={styles.noSuggestionsText}>
              No specific exercise recommendations at this time. Continue with
              your current plan.
            </Text>
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

        {/* Regenerate button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.regenerateButton}
            onPress={handleRegenerateAnalysis}>
            <Text style={styles.buttonText}>Regenerate Analysis</Text>
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
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
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
    color: '#111827',
    flex: 1,
  },
  suggestionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  cardDetails: {
    marginTop: 12,
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  expandHint: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
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
});
