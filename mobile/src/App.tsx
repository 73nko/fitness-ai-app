import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// Import NativeWind setup
import './utils/nativewind-setup';

import { AuthProvider } from './context/AuthContext';
import { TrainingProvider } from './context/TrainingContext';
import Navigation from './navigation';

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TrainingProvider>
          <NavigationContainer>
            <Navigation />
            <StatusBar style='auto' />
          </NavigationContainer>
        </TrainingProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
