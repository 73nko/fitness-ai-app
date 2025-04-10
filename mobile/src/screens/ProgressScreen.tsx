import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation';
import { useAuth } from '../context/AuthContext';
import grpcClient, {
  ExerciseLog,
  GetUserExerciseLogsRequest,
} from '../services/grpcClient';
import { ExerciseChart } from '../components/ExerciseChart';

// Time range options for filtering
const TIME_RANGES = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: 'All', days: 365 },
];

// Metric options for viewing
const METRICS: { label: string; value: 'weight' | 'rir' }[] = [
  { label: 'Weight', value: 'weight' },
  { label: 'RIR', value: 'rir' },
];

type ProgressScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Progress'
>;

export default function ProgressScreen() {
  const navigation = useNavigation<ProgressScreenNavigationProp>();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState(30);
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'rir'>(
    'weight'
  );
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  // Group logs by exercise name for easy access
  const exerciseGroups = React.useMemo(() => {
    const groups: { [key: string]: ExerciseLog[] } = {};

    exerciseLogs.forEach((log) => {
      if (!groups[log.exercise_name]) {
        groups[log.exercise_name] = [];
      }
      groups[log.exercise_name].push(log);
    });

    return groups;
  }, [exerciseLogs]);

  // Get list of unique exercise names
  const exerciseNames = React.useMemo(() => {
    return Object.keys(exerciseGroups).sort();
  }, [exerciseGroups]);

  // Set first exercise as selected if none is selected and we have data
  useEffect(() => {
    if (exerciseNames.length > 0 && !selectedExercise) {
      setSelectedExercise(exerciseNames[0]);
    }
  }, [exerciseNames, selectedExercise]);

  // Fetch data from API
  const fetchExerciseLogs = useCallback(
    async (isRefresh = false) => {
      if (!user) {
        setError('User not authenticated');
        setIsLoading(false);
        return;
      }

      try {
        if (!isRefresh) {
          setIsLoading(true);
        }
        setError(null);

        const request: GetUserExerciseLogsRequest = {
          user_id: user.id,
          days: selectedDays,
          exercise_name: selectedExercise || undefined,
        };

        const response =
          await grpcClient.trainingService.getUserExerciseLogs(request);

        if (response.logs.length === 0 && selectedExercise) {
          // If filtering by exercise and no logs found, try fetching all logs instead
          const allLogsRequest: GetUserExerciseLogsRequest = {
            user_id: user.id,
            days: selectedDays,
          };
          const allResponse =
            await grpcClient.trainingService.getUserExerciseLogs(
              allLogsRequest
            );
          setExerciseLogs(allResponse.logs);
        } else {
          setExerciseLogs(response.logs);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load exercise data');
        console.error('Error fetching exercise logs:', err);

        Alert.alert(
          'Error Loading Data',
          err.message ||
            'Failed to load exercise data. Please try again later.',
          [{ text: 'OK' }]
        );
      } finally {
        setIsLoading(false);
        if (isRefresh) {
          setIsRefreshing(false);
        }
      }
    },
    [user, selectedDays, selectedExercise]
  );

  // Initial data load
  useEffect(() => {
    fetchExerciseLogs();
  }, [fetchExerciseLogs]);

  // Refetch when time range or exercise changes
  useEffect(() => {
    if (!isLoading) {
      fetchExerciseLogs();
    }
  }, [selectedDays, selectedExercise, fetchExerciseLogs, isLoading]);

  // Handle pull-to-refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchExerciseLogs(true);
  }, [fetchExerciseLogs]);

  // Get logs for selected exercise
  const selectedExerciseLogs = React.useMemo(() => {
    if (!selectedExercise) return [];
    return exerciseGroups[selectedExercise] || [];
  }, [exerciseGroups, selectedExercise]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#3B82F6' />
        <Text style={styles.loadingText}>Loading your progress data...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchExerciseLogs()}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Empty state
  if (exerciseNames.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={styles.emptyContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        <Text style={styles.emptyTitle}>No Progress Data Yet</Text>
        <Text style={styles.emptyText}>
          Complete workouts and log your exercises to see your progress over
          time.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Go to Workouts</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Time range selector */}
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Time Range:</Text>
          <View style={styles.filterOptions}>
            {TIME_RANGES.map((range) => (
              <TouchableOpacity
                key={range.label}
                style={[
                  styles.filterOption,
                  selectedDays === range.days && styles.filterOptionSelected,
                ]}
                onPress={() => setSelectedDays(range.days)}>
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedDays === range.days &&
                      styles.filterOptionTextSelected,
                  ]}>
                  {range.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Metric selector */}
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Metric:</Text>
          <View style={styles.filterOptions}>
            {METRICS.map((metric) => (
              <TouchableOpacity
                key={metric.label}
                style={[
                  styles.filterOption,
                  selectedMetric === metric.value &&
                    styles.filterOptionSelected,
                ]}
                onPress={() => setSelectedMetric(metric.value)}>
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedMetric === metric.value &&
                      styles.filterOptionTextSelected,
                  ]}>
                  {metric.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Exercise selector and chart */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        {/* Add AI Analysis button */}
        <View style={styles.analysisButtonContainer}>
          <TouchableOpacity
            style={styles.analysisButton}
            onPress={() =>
              navigation.navigate('ProgressAnalysis', {
                trainingPlanId: 'active-plan', // In a real app, use the active plan ID
              })
            }>
            <Text style={styles.analysisButtonText}>
              Get AI Progress Analysis
            </Text>
          </TouchableOpacity>
        </View>

        {/* Exercise selector */}
        <View style={styles.exerciseSelector}>
          <Text style={styles.sectionTitle}>Select Exercise:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.exerciseButtonsContainer}>
            {exerciseNames.map((exerciseName) => (
              <TouchableOpacity
                key={exerciseName}
                style={[
                  styles.exerciseButton,
                  selectedExercise === exerciseName &&
                    styles.exerciseButtonSelected,
                ]}
                onPress={() => setSelectedExercise(exerciseName)}>
                <Text
                  style={[
                    styles.exerciseButtonText,
                    selectedExercise === exerciseName &&
                      styles.exerciseButtonTextSelected,
                  ]}>
                  {exerciseName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Show chart for selected exercise */}
        {selectedExercise && (
          <View style={styles.chartContainer}>
            <ExerciseChart
              exerciseLogs={selectedExerciseLogs}
              metric={selectedMetric}
              title={selectedExercise}
              days={selectedDays}
            />

            {/* Summary stats */}
            <View style={styles.statsContainer}>
              <StatsCard
                exerciseLogs={selectedExerciseLogs}
                metric={selectedMetric}
                days={selectedDays}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Simple stats component
interface StatsCardProps {
  exerciseLogs: ExerciseLog[];
  metric: 'weight' | 'rir';
  days: number;
}

function StatsCard({ exerciseLogs, metric, days }: StatsCardProps) {
  // Filter logs by days
  const filteredLogs = React.useMemo(() => {
    if (!exerciseLogs.length) return [];

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - days);
    cutoffDate.setHours(0, 0, 0, 0);

    return exerciseLogs.filter(
      (log) => new Date(log.created_at).getTime() >= cutoffDate.getTime()
    );
  }, [exerciseLogs, days]);

  if (filteredLogs.length === 0) {
    return (
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Statistics</Text>
        <Text style={styles.noStatsText}>
          No data available for selected period
        </Text>
      </View>
    );
  }

  // Get metric values
  const values = filteredLogs.map((log) =>
    metric === 'weight' ? log.weight : log.rir
  );

  // Calculate stats
  const currentValue = values[values.length - 1];
  const startingValue = values[0];
  const maxValue = Math.max(...values);
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length;

  // Calculate change
  const change = currentValue - startingValue;
  const changePercent =
    startingValue !== 0 ? (change / startingValue) * 100 : 0;

  // For RIR, lower is better. For weight, higher is better.
  const isPositiveChange = metric === 'weight' ? change > 0 : change < 0;

  return (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>Statistics</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Current</Text>
          <Text style={styles.statValue}>
            {currentValue.toFixed(metric === 'weight' ? 1 : 0)}
            {metric === 'weight' ? ' kg' : ''}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Starting</Text>
          <Text style={styles.statValue}>
            {startingValue.toFixed(metric === 'weight' ? 1 : 0)}
            {metric === 'weight' ? ' kg' : ''}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Change</Text>
          <Text
            style={[
              styles.statValue,
              isPositiveChange ? styles.positiveChange : styles.negativeChange,
            ]}>
            {change > 0 ? '+' : ''}
            {change.toFixed(metric === 'weight' ? 1 : 0)}
            {metric === 'weight' ? ' kg' : ''}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Max</Text>
          <Text style={styles.statValue}>
            {maxValue.toFixed(metric === 'weight' ? 1 : 0)}
            {metric === 'weight' ? ' kg' : ''}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Average</Text>
          <Text style={styles.statValue}>
            {avgValue.toFixed(metric === 'weight' ? 1 : 0)}
            {metric === 'weight' ? ' kg' : ''}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Sessions</Text>
          <Text style={styles.statValue}>{filteredLogs.length}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterContainer: {
    backgroundColor: 'white',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    width: 100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterOptions: {
    flex: 1,
    flexDirection: 'row',
  },
  filterOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  filterOptionSelected: {
    backgroundColor: '#3B82F6',
  },
  filterOptionText: {
    fontSize: 14,
  },
  filterOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  exerciseSelector: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseButtonsContainer: {
    paddingRight: 15,
  },
  exerciseButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  exerciseButtonSelected: {
    backgroundColor: '#3B82F6',
  },
  exerciseButtonText: {
    fontSize: 14,
  },
  exerciseButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  chartContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  statsContainer: {
    marginTop: 10,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '33%',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positiveChange: {
    color: '#22c55e',
  },
  negativeChange: {
    color: '#ef4444',
  },
  noStatsText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  analysisButtonContainer: {
    padding: 15,
    marginBottom: 5,
  },
  analysisButton: {
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  analysisButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
