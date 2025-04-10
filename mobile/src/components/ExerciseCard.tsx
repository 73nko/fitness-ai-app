import React from 'react';
import { View, Text } from 'react-native';
import { ExerciseData } from '../services/grpcClient';

interface ExerciseCardProps {
  exercise: ExerciseData;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <View className='bg-white rounded-lg p-4 shadow-sm'>
      <Text className='text-lg font-bold text-primary mb-1'>
        {exercise.name}
      </Text>
      <Text className='text-text mb-3'>{exercise.description}</Text>

      <View className='flex-row flex-wrap justify-between mb-1'>
        <View className='bg-gray-100 px-3 py-1 rounded-full mb-2'>
          <Text className='text-text font-medium'>Sets: {exercise.sets}</Text>
        </View>

        <View className='bg-gray-100 px-3 py-1 rounded-full mb-2'>
          <Text className='text-text font-medium'>Reps: {exercise.reps}</Text>
        </View>

        <View className='bg-gray-100 px-3 py-1 rounded-full mb-2'>
          <Text className='text-text font-medium'>
            Rest: {exercise.restTime}s
          </Text>
        </View>
      </View>

      {exercise.notes ? (
        <View className='mt-2 bg-blue-50 p-2 rounded'>
          <Text className='text-text-muted italic'>{exercise.notes}</Text>
        </View>
      ) : null}
    </View>
  );
}
