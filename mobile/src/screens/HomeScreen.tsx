import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation';
import { useAuth } from '../context/AuthContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuth();

  return (
    <View className='flex-1 items-center justify-center bg-background p-4'>
      <View className='mb-8'>
        <Text className='text-3xl font-bold text-center text-primary mb-2'>
          Welcome to Fitness AI
        </Text>
        <Text className='text-lg text-center text-text-muted'>
          Your intelligent workout companion
        </Text>
      </View>

      <View className='w-full max-w-sm bg-white rounded-xl p-5 shadow-md mb-4'>
        <Text className='text-xl font-bold mb-3 text-text'>Quick Actions</Text>

        <TouchableOpacity
          className='bg-primary p-4 rounded-lg mb-3'
          onPress={() => navigation.navigate('GeneratePlan')}>
          <Text className='text-white font-semibold text-center'>
            Create Training Plan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='bg-secondary p-4 rounded-lg mb-3'
          onPress={() => navigation.navigate('SessionFeedback', {})}>
          <Text className='text-white font-semibold text-center'>
            Today's Workout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='bg-indigo-500 p-4 rounded-lg mb-3'
          onPress={() => navigation.navigate('Progress')}>
          <Text className='text-white font-semibold text-center'>
            Track Your Progress
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='bg-gray-200 p-4 rounded-lg'
          onPress={() => navigation.navigate('Profile')}>
          <Text className='text-text font-semibold text-center'>
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
