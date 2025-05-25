import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';
import {
  LoginRequest,
  LoginResponse,
  ProfileResponse,
} from '@shared-types/user';

const AUTH_TOKEN_KEY = 'auth_token';

let memoryToken: string | null = null;

async function getToken(): Promise<string | null> {
  if (memoryToken) return memoryToken;
  memoryToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return memoryToken;
}

async function setToken(token: string | null): Promise<void> {
  memoryToken = token;
  if (token) {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

interface ApiErrorResponse {
  error: string;
  message: string;
  details?: any; // for validation errors from Zod, for example
  status?: number; // Will be added by our client
}

async function request<TResponse, TRequest = undefined>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: TRequest,
  isPublic: boolean = false
): Promise<TResponse> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (!isPublic) {
    const token = await getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      // Handle cases where token is required but not found, e.g., redirect to login or throw specific error
      // For now, letting the request proceed and rely on server 401
      console.warn(
        `Attempted to make a private API call (${method} ${endpoint}) without a token.`
      );
    }
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorData: ApiErrorResponse;
      try {
        errorData = await response.json();
      } catch (e) {
        // If parsing error JSON fails, create a generic error
        errorData = {
          error: 'NetworkError',
          message: response.statusText || 'An unknown network error occurred',
          status: response.status,
        };
      }
      errorData.status = response.status; // Ensure status is set
      throw errorData;
    }

    // Handle cases where response might be empty (e.g., 204 No Content)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return (await response.json()) as TResponse;
    }
    // @ts-ignore for non-JSON success responses like 204
    return undefined as TResponse;
  } catch (error) {
    // Ensure it's in our ApiErrorResponse format or a generic error if not already
    if (typeof error === 'object' && error !== null && 'message' in error) {
      throw error as ApiErrorResponse; // Already an ApiErrorResponse or similar enough
    }
    throw {
      error: 'RequestFailed',
      message: 'The API request failed. Please check your connection.',
    } as ApiErrorResponse;
  }
}

// --- Placeholder API Methods --- (These will be expanded in Task 3+)

// Auth
async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await request<LoginResponse, LoginRequest>(
    '/auth/login',
    'POST',
    credentials,
    true
  );
  if (response.token) {
    await setToken(response.token);
  }
  return response;
}

async function logout(): Promise<void> {
  await setToken(null);
  // Optionally, call a /auth/logout endpoint if it exists on the server
  // await request<void>('/auth/logout', 'POST');
}

// User
async function getUserProfile(): Promise<ProfileResponse> {
  // The actual endpoint will be defined in Task 4
  return request<ProfileResponse>('/user/profile', 'GET');
}

export const apiClient = {
  login,
  logout,
  getUserProfile,
  // We will add more methods here for training, AI, etc., as we build those REST endpoints.
  // For React Query, these functions are the async functions that React Query will use.
  // Example for React Query with a hypothetical getTrainingPlans:
  // getTrainingPlans: () => request<TrainingPlan[]>('/training/plans', 'GET'),
  setToken, // Exposing setToken directly might be useful for initial auth setup outside login
  getToken, // Exposing for debugging or specific scenarios, use with caution
};

export type { ApiErrorResponse };
