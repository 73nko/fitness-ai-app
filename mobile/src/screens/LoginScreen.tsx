import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { isValidEmail, isValidPassword } from '../utils/validation';
import { RootStackParamList } from '../navigation';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Clear auth context errors when component unmounts
  React.useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Display auth error as an alert
  React.useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error);
    }
  }, [error]);

  function validateForm(): boolean {
    const errors: FormErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }

  async function handleLogin() {
    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      // Error is handled by the AuthContext
    }
  }

  function navigateToRegister() {
    navigation.navigate('Register');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-background'>
      <ScrollView contentContainerClassName='flex-grow'>
        <View className='flex-1 p-6 justify-center'>
          <View className='mb-8'>
            <Text className='text-3xl font-bold text-center text-primary'>
              Welcome Back
            </Text>
            <Text className='text-base text-center text-text-muted mt-2'>
              Sign in to continue to your fitness journey
            </Text>
          </View>

          <View className='mb-6'>
            <Text className='text-sm font-medium text-text mb-1'>Email</Text>
            <TextInput
              className={`bg-white p-3 rounded-lg border ${
                formErrors.email ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder='your@email.com'
              keyboardType='email-address'
              autoCapitalize='none'
              value={formData.email}
              onChangeText={(text) => {
                setFormData({ ...formData, email: text });
                if (formErrors.email) {
                  setFormErrors({ ...formErrors, email: undefined });
                }
              }}
            />
            {formErrors.email && (
              <Text className='text-red-500 text-xs mt-1'>
                {formErrors.email}
              </Text>
            )}
          </View>

          <View className='mb-8'>
            <Text className='text-sm font-medium text-text mb-1'>Password</Text>
            <TextInput
              className={`bg-white p-3 rounded-lg border ${
                formErrors.password ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder='Password'
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => {
                setFormData({ ...formData, password: text });
                if (formErrors.password) {
                  setFormErrors({ ...formErrors, password: undefined });
                }
              }}
            />
            {formErrors.password && (
              <Text className='text-red-500 text-xs mt-1'>
                {formErrors.password}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className={`${isLoading ? 'bg-gray-400' : 'bg-primary'} p-4 rounded-lg mb-4`}
            onPress={handleLogin}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color='white' />
            ) : (
              <Text className='text-white font-semibold text-center'>
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          <View className='flex-row justify-center'>
            <Text className='text-text-muted'>Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text className='text-primary font-medium'>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
