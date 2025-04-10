import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation';
import { ExerciseData } from '../services/grpcClient';
import ExerciseCard from '../components/ExerciseCard';

type PlanSummaryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PlanSummary'
>;

type PlanSummaryScreenRouteProp = RouteProp<RootStackParamList, 'PlanSummary'>;

// Group exercises by day of week
function groupExercisesByDay(
  exercises: ExerciseData[]
): Map<number, ExerciseData[]> {
  const grouped = new Map<number, ExerciseData[]>();

  exercises.forEach((exercise) => {
    if (!grouped.has(exercise.dayOfWeek)) {
      grouped.set(exercise.dayOfWeek, []);
    }

    grouped.get(exercise.dayOfWeek)?.push(exercise);
  });

  // Sort exercises by order within each day
  for (const [day, exs] of grouped.entries()) {
    grouped.set(
      day,
      exs.sort((a, b) => a.order - b.order)
    );
  }

  return grouped;
}

// Convert day number to day name
function getDayName(day: number): string {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[day % 7];
}

export default function PlanSummaryScreen() {
  const navigation = useNavigation<PlanSummaryScreenNavigationProp>();
  const route = useRoute<PlanSummaryScreenRouteProp>();
  const { plan } = route.params;

  const groupedExercises = groupExercisesByDay(plan.exercises);
  const dayNumbers = Array.from(groupedExercises.keys()).sort();

  return (
    <ScrollView className='flex-1 bg-background'>
      <View className='p-4'>
        <View className='mb-4'>
          <Text className='text-3xl font-bold text-primary'>{plan.name}</Text>
          {plan.description ? (
            <Text className='text-text-muted mt-1'>{plan.description}</Text>
          ) : null}
        </View>

        <View className='bg-white rounded-xl p-5 shadow-md mb-6'>
          <Text className='text-xl font-semibold text-text mb-2'>
            Plan Overview
          </Text>
          <Text className='text-text'>
            {dayNumbers.length} training days per week
          </Text>
          <Text className='text-text'>
            {plan.exercises.length} total exercises
          </Text>
          <Text className='text-text'>
            Created: {new Date(plan.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {dayNumbers.length > 0 ? (
          dayNumbers.map((day) => (
            <View key={day} className='mb-6'>
              <Text className='text-xl font-bold text-primary mb-2'>
                Day {day}: {getDayName(day)}
              </Text>

              <FlatList
                data={groupedExercises.get(day)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ExerciseCard exercise={item} />}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View className='h-2' />}
              />
            </View>
          ))
        ) : (
          <View className='bg-white rounded-xl p-5 shadow-md'>
            <Text className='text-text text-center'>
              No exercises found in this plan. Try generating a new plan.
            </Text>
          </View>
        )}

        <View className='mt-4 mb-8'>
          <TouchableOpacity
            className='bg-primary p-4 rounded-lg mb-3'
            onPress={() => navigation.navigate('Home')}>
            <Text className='text-white font-semibold text-center'>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
