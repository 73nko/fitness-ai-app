import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation';
import { useAuth } from '../context/AuthContext';
import { useTraining } from '../context/TrainingContext';
import grpcClient, { TrainingPlanRequest } from '../services/grpcClient';

type GeneratePlanScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GeneratePlan'
>;

// Focus areas matching the expected interface
const FOCUS_AREAS = ['general', 'strength', 'hypertrophy', 'performance'];

export default function GeneratePlanScreen() {
  const navigation = useNavigation<GeneratePlanScreenNavigationProp>();
  const { user } = useAuth();
  const { setTrainingPlan } = useTraining();

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('3');
  const [focusArea, setFocusArea] = useState(FOCUS_AREAS[0]);
  const [sessionDuration, setSessionDuration] = useState('45');
  const [includeWarmup, setIncludeWarmup] = useState(true);
  const [includeCooldown, setIncludeCooldown] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFocusArea, setSelectedFocusArea] = useState(FOCUS_AREAS[0]);

  // Validation
  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      !isNaN(parseInt(daysPerWeek)) &&
      parseInt(daysPerWeek) > 0 &&
      parseInt(daysPerWeek) <= 7 &&
      focusArea !== '' &&
      !isNaN(parseInt(sessionDuration)) &&
      parseInt(sessionDuration) > 0
    );
  };

  // Handle focus area selection
  const selectFocusArea = (area: string) => {
    setFocusArea(area);
    setSelectedFocusArea(area);
  };

  // Handle form submission
  const handleGeneratePlan = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'You must be logged in to generate a training plan');
      return;
    }

    if (!isFormValid()) {
      Alert.alert(
        'Invalid Form',
        'Please fill out all required fields correctly'
      );
      return;
    }

    setIsLoading(true);

    try {
      const request: TrainingPlanRequest = {
        userId: user.id,
        name,
        description,
        daysPerWeek: parseInt(daysPerWeek),
        focusArea,
        sessionDuration: parseInt(sessionDuration),
        includeWarmup,
        includeCooldown,
      };

      const trainingPlan =
        await grpcClient.trainingService.generateTrainingPlan(request);

      // Save plan to context if available
      setTrainingPlan(trainingPlan);

      // Navigate to the summary screen with the generated plan
      navigation.navigate('PlanSummary', { plan: trainingPlan });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to generate training plan');
      console.error('Failed to generate plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className='flex-1 bg-background'>
      <View className='p-4'>
        <Text className='text-2xl font-bold text-primary mb-4'>
          Create Training Plan
        </Text>

        <View className='bg-white rounded-xl p-5 shadow-md mb-4'>
          <Text className='text-lg font-medium text-text mb-1'>Plan Name*</Text>
          <TextInput
            className='border border-gray-300 rounded-lg p-3 mb-4 text-text'
            placeholder='My Training Plan'
            value={name}
            onChangeText={setName}
          />

          <Text className='text-lg font-medium text-text mb-1'>
            Description
          </Text>
          <TextInput
            className='border border-gray-300 rounded-lg p-3 mb-4 text-text'
            placeholder='Optional plan description'
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          <Text className='text-lg font-medium text-text mb-1'>
            Days Per Week*
          </Text>
          <TextInput
            className='border border-gray-300 rounded-lg p-3 mb-4 text-text'
            placeholder='3'
            value={daysPerWeek}
            onChangeText={setDaysPerWeek}
            keyboardType='numeric'
          />

          <Text className='text-lg font-medium text-text mb-1'>
            Focus Area*
          </Text>
          <View className='flex-row flex-wrap mb-4'>
            {FOCUS_AREAS.map((area) => (
              <TouchableOpacity
                key={area}
                className={`m-1 px-3 py-2 rounded-lg ${
                  focusArea === area ? 'bg-primary' : 'bg-gray-200'
                }`}
                onPress={() => selectFocusArea(area)}>
                <Text
                  className={`${
                    focusArea === area ? 'text-white' : 'text-text'
                  }`}>
                  {area}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className='text-lg font-medium text-text mb-1'>
            Session Duration (minutes)*
          </Text>
          <TextInput
            className='border border-gray-300 rounded-lg p-3 mb-4 text-text'
            placeholder='45'
            value={sessionDuration}
            onChangeText={setSessionDuration}
            keyboardType='numeric'
          />

          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-lg font-medium text-text'>
              Include Warmup
            </Text>
            <Switch
              value={includeWarmup}
              onValueChange={setIncludeWarmup}
              trackColor={{ false: '#ddd', true: '#3B82F6' }}
            />
          </View>

          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-lg font-medium text-text'>
              Include Cooldown
            </Text>
            <Switch
              value={includeCooldown}
              onValueChange={setIncludeCooldown}
              trackColor={{ false: '#ddd', true: '#3B82F6' }}
            />
          </View>

          <TouchableOpacity
            className={`p-4 rounded-lg ${
              isFormValid() && !isLoading ? 'bg-primary' : 'bg-gray-300'
            }`}
            onPress={handleGeneratePlan}
            disabled={!isFormValid() || isLoading}>
            {isLoading ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <Text className='text-white font-semibold text-center'>
                Generate Training Plan
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
