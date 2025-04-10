import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import GeneratePlanScreen from '../screens/GeneratePlanScreen';
import PlanSummaryScreen from '../screens/PlanSummaryScreen';
import SessionFeedbackScreen from '../screens/SessionFeedbackScreen';
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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  const { isAuthenticated, isLoading } = useAuth();

  // If still checking auth status, could show a splash screen or loading indicator
  if (isLoading) {
    return null; // Or a loading spinner component
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}
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
      {isAuthenticated ? (
        // Authenticated user screens
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
            options={{ title: "Today's Workout" }}
          />
        </>
      ) : (
        // Authentication screens
        <>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{
              title: 'Sign In',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{
              title: 'Create Account',
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default Navigation;
