import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import grpcClient, { UserProfile, ProfileData } from '../services/grpcClient';

// Auth storage keys
const AUTH_TOKEN_KEY = '@fitness_app:auth_token';
const USER_DATA_KEY = '@fitness_app:user_data';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileData?: ProfileData;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  clearError: () => {},
  setUser: () => {},
  setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('Checking auth status...');
        setIsLoading(true);

        // Get stored auth data
        const storedToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        console.log('Stored token:', storedToken ? 'exists' : 'not found');

        const storedUserData = await AsyncStorage.getItem(USER_DATA_KEY);
        console.log(
          'Stored user data:',
          storedUserData ? 'exists' : 'not found'
        );

        if (storedToken && storedUserData) {
          console.log('Found stored credentials, restoring session...');
          // Set the auth token on the gRPC client
          grpcClient.setAuthToken(storedToken);
          setToken(storedToken);

          // Parse and set the user data
          const userData = JSON.parse(storedUserData) as UserProfile;
          setUser(userData);
          console.log('Session restored successfully');
        } else {
          console.log('No stored credentials found');
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        setError('Failed to restore authentication session');
      } finally {
        console.log('Auth check completed, setting isLoading to false');
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const storeAuthData = async (authToken: string, userData: UserProfile) => {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

      // Set token on the gRPC client for future authenticated requests
      grpcClient.setAuthToken(authToken);
      setToken(authToken);
    } catch (err) {
      console.error('Failed to store auth data:', err);
      throw new Error('Failed to save authentication data');
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the gRPC service to authenticate
      const response = await grpcClient.userService.authenticateUser({
        email,
        password,
      });

      // Store auth data
      await storeAuthData(response.token, response.user);

      // Update state
      setUser(response.user);
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the gRPC service to create a user
      const response = await grpcClient.userService.createUserProfile({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        profileData: data.profileData || {},
      });

      // After successful registration, automatically log the user in
      await login(data.email, data.password);
    } catch (err: any) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      // Clear stored auth data
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);

      // Clear auth token from gRPC client
      grpcClient.clearAuthToken();

      // Update state
      setUser(null);
      setToken(null);
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Failed to logout properly');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
        setUser,
        setToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
