import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import GeneratePlanScreen from '../screens/GeneratePlanScreen';
import PlanSummaryScreen from '../screens/PlanSummaryScreen';
import SessionFeedbackScreen from '../screens/SessionFeedbackScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProgressAnalysisScreen from '../screens/ProgressAnalysisScreen';
import { useAuth } from '../context/AuthContext';
import { TrainingPlanResponse } from '../services/grpcClient';

export type RootStackParamList = {
  // Auth Screens
  Login: undefined;
  Register: undefined;
  // App Screens
  Home: undefined;
  Profile: undefined;
  GeneratePlan: undefined;
  PlanSummary: { plan: TrainingPlanResponse };
  SessionFeedback: { sessionId?: string };
  Progress: undefined;
  ProgressAnalysis: { trainingPlanId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AuthStack - Navigation stack for unauthenticated users
 */
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}

/**
 * AppStack - Navigation stack for authenticated users
 */
function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: 'Fitness AI' }}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ title: 'Your Profile' }}
      />
      <Stack.Screen
        name='GeneratePlan'
        component={GeneratePlanScreen}
        options={{ title: 'Create Training Plan' }}
      />
      <Stack.Screen
        name='PlanSummary'
        component={PlanSummaryScreen}
        options={{ title: 'Training Plan' }}
      />
      <Stack.Screen
        name='SessionFeedback'
        component={SessionFeedbackScreen}
        options={{ title: 'Workout Feedback' }}
      />
      <Stack.Screen
        name='Progress'
        component={ProgressScreen}
        options={{ title: 'Your Progress' }}
      />
      <Stack.Screen
        name='ProgressAnalysis'
        component={ProgressAnalysisScreen}
        options={{ title: 'Progress Analysis' }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Show loading indicator while determining auth state
  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#3B82F6' />
      </View>
    );
  }

  // Choose the appropriate stack based on authentication state
  return isAuthenticated ? <AppStack /> : <AuthStack />;
}
