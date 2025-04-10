import { grpc } from '@improbable-eng/grpc-web';
import Config from 'react-native-config';

// Define service endpoints
const GRPC_ENDPOINT = Config.GRPC_ENDPOINT || 'http://localhost:8080';

// Types from our proto file
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ProfileData {
  age?: number;
  weight?: number;
  height?: number;
  fitnessLevel?: string;
  fitnessGoals?: string[];
  medicalIssues?: string[];
  availableEquipment?: string[];
  trainingPreferences?: string;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profile?: ProfileData;
}

export interface TrainingPlanResponse {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  generatedBy: string;
  exercises: ExerciseData[];
}

export interface ExerciseData {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: string;
  restTime: number;
  notes: string;
  dayOfWeek: number;
  order: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

// Simplified GrpcClient class
class GrpcClient {
  private endpoint: string;
  private authToken: string | null = null;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  clearAuthToken(): void {
    this.authToken = null;
  }

  // Mock implementation
  login(email: string, password: string): Promise<AuthResponse> {
    return Promise.resolve({
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
      },
    });
  }

  getUserProfile(userId: string): Promise<UserProfileResponse> {
    return Promise.resolve({
      id: userId,
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      profile: {
        age: 30,
        weight: 75,
        height: 180,
        fitnessLevel: 'Intermediate',
        fitnessGoals: ['Build muscle', 'Improve endurance'],
        medicalIssues: [],
        availableEquipment: ['Dumbbells', 'Bench', 'Pull-up bar'],
        trainingPreferences: JSON.stringify({
          preferredDays: [1, 3, 5],
          maxSessionDuration: 60,
        }),
      },
    });
  }
}

// Create and export a singleton instance
const grpcClient = new GrpcClient(GRPC_ENDPOINT);
export default grpcClient;
