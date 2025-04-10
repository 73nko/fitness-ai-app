import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ExerciseLog } from '../services/grpcClient';

interface ExerciseChartProps {
  exerciseLogs: ExerciseLog[];
  metric: 'weight' | 'rir';
  title: string;
  days?: number;
}

export function ExerciseChart({
  exerciseLogs,
  metric,
  title,
  days = 30,
}: ExerciseChartProps) {
  // Filter logs to show only requested days
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

  // Format data for chart
  const chartData = React.useMemo(() => {
    if (!filteredLogs.length) return { labels: [], datasets: [{ data: [] }] };

    // Sort logs by date (asc)
    const sortedLogs = [...filteredLogs].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // Extract dates for labels (format: "MM/DD")
    const labels = sortedLogs.map((log) => {
      const date = new Date(log.created_at);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    // Extract metric values - handle custom min/max since chart doesn't support yMin/yMax
    let data;

    if (metric === 'weight') {
      // For weight, we want a bit of padding to show progress better
      const values = sortedLogs.map((log) => log.weight);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      // Add some padding for visual clarity if there's enough range
      const hasRange = maxValue - minValue > 5;

      // Add padding if there's a decent range
      data = hasRange
        ? sortedLogs.map((log) => log.weight)
        : sortedLogs.map((log) => log.weight);
    } else {
      // For RIR, we always want 0-5 scale
      data = sortedLogs.map((log) => log.rir);
    }

    return {
      labels,
      datasets: [{ data }],
    };
  }, [filteredLogs, metric]);

  // Show message when no data
  if (!filteredLogs.length) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>
          No data available for this exercise
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title} ({metric === 'weight' ? 'Weight (kg)' : 'RIR'})
      </Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#3B82F6',
          backgroundGradientTo: '#2563EB',
          decimalPlaces: metric === 'weight' ? 1 : 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#1E40AF',
          },
        }}
        style={styles.chart}
        yAxisLabel={metric === 'weight' ? '' : ''}
        yAxisSuffix={metric === 'weight' ? ' kg' : ''}
        bezier
        fromZero={metric === 'rir'}
        segments={metric === 'rir' ? 5 : 4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
    paddingRight: 0,
  },
  noDataContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
  },
});
