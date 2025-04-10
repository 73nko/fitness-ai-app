import React from 'react';
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

export default function Navigation() {
  const { user, isLoading } = useAuth();

  // Skip rendering until auth state is determined
  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {user ? (
        // Authenticated routes
        <>
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
        </>
      ) : (
        // Unauthenticated routes
        <>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
