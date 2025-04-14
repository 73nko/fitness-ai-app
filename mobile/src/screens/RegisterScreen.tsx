import React, { useState, useEffect } from 'react';
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

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Clear auth context errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Display auth error as an alert
  useEffect(() => {
    if (error) {
      Alert.alert('Registration Error', error);
    }
  }, [error]);

  // Redirect to Home screen after successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated, navigation]);

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
    } else if (!isValidPassword(formData.password)) {
      errors.password =
        'Password must be at least 8 characters with uppercase, lowercase, and numbers';
      isValid = false;
    }

    // Confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Name validation
    if (!formData.firstName) {
      errors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }

  async function handleRegister() {
    if (!validateForm()) return;

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
    } catch (err) {
      // Error is handled by the AuthContext
    }
  }

  function navigateToLogin() {
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-background'>
      <ScrollView contentContainerClassName='pb-10'>
        <View className='p-6'>
          <View className='mb-6'>
            <Text className='text-3xl font-bold text-center text-primary'>
              Create Account
            </Text>
            <Text className='text-base text-center text-text-muted mt-2'>
              Join our fitness community and start your journey
            </Text>
          </View>

          {/* Email Field */}
          <View className='mb-4'>
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

          {/* First Name Field */}
          <View className='mb-4'>
            <Text className='text-sm font-medium text-text mb-1'>
              First Name
            </Text>
            <TextInput
              className={`bg-white p-3 rounded-lg border ${
                formErrors.firstName ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder='John'
              value={formData.firstName}
              onChangeText={(text) => {
                setFormData({ ...formData, firstName: text });
                if (formErrors.firstName) {
                  setFormErrors({ ...formErrors, firstName: undefined });
                }
              }}
            />
            {formErrors.firstName && (
              <Text className='text-red-500 text-xs mt-1'>
                {formErrors.firstName}
              </Text>
            )}
          </View>

          {/* Last Name Field */}
          <View className='mb-4'>
            <Text className='text-sm font-medium text-text mb-1'>
              Last Name
            </Text>
            <TextInput
              className={`bg-white p-3 rounded-lg border ${
                formErrors.lastName ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder='Doe'
              value={formData.lastName}
              onChangeText={(text) => {
                setFormData({ ...formData, lastName: text });
                if (formErrors.lastName) {
                  setFormErrors({ ...formErrors, lastName: undefined });
                }
              }}
            />
            {formErrors.lastName && (
              <Text className='text-red-500 text-xs mt-1'>
                {formErrors.lastName}
              </Text>
            )}
          </View>

          {/* Password Field */}
          <View className='mb-4'>
            <Text className='text-sm font-medium text-text mb-1'>Password</Text>
            <TextInput
              className={`bg-white p-3 rounded-lg border ${
                formErrors.password ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder='Password'
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

          {/* Confirm Password Field */}
          <View className='mb-6'>
            <Text className='text-sm font-medium text-text mb-1'>
              Confirm Password
            </Text>
            <TextInput
              className={`bg-white p-3 rounded-lg border ${
                formErrors.confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-200'
              }`}
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChangeText={(text) => {
                setFormData({ ...formData, confirmPassword: text });
                if (formErrors.confirmPassword) {
                  setFormErrors({ ...formErrors, confirmPassword: undefined });
                }
              }}
            />
            {formErrors.confirmPassword && (
              <Text className='text-red-500 text-xs mt-1'>
                {formErrors.confirmPassword}
              </Text>
            )}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            className={`${isLoading ? 'bg-gray-400' : 'bg-primary'} p-4 rounded-lg mb-4`}
            onPress={handleRegister}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color='white' />
            ) : (
              <Text className='text-white font-semibold text-center'>
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View className='flex-row justify-center'>
            <Text className='text-text-muted'>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text className='text-primary font-medium'>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
