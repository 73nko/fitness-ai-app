import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName='Home'
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
    </Stack.Navigator>
  );
}

export default Navigation;
