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

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileData?: ProfileData;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

// User service interfaces
interface UserService {
  authenticateUser: (request: LoginRequest) => Promise<AuthResponse>;
  createUserProfile: (
    request: CreateUserRequest
  ) => Promise<UserProfileResponse>;
  getUserProfile: (userId: string) => Promise<UserProfileResponse>;
}

// Simplified GrpcClient class
class GrpcClient {
  private endpoint: string;
  private authToken: string | null = null;
  public userService: UserService;

  constructor(endpoint: string) {
    this.endpoint = endpoint;

    // Initialize the user service with methods that interact with the gRPC backend
    this.userService = {
      authenticateUser: this.authenticateUser.bind(this),
      createUserProfile: this.createUserProfile.bind(this),
      getUserProfile: this.getUserProfile.bind(this),
    };
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  clearAuthToken(): void {
    this.authToken = null;
  }

  // Authentication method
  private async authenticateUser(request: LoginRequest): Promise<AuthResponse> {
    try {
      // This would be a real gRPC call in production
      // For development, we're using a mock implementation
      console.log('Authenticating user:', request.email);

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock successful response
      return {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: request.email,
          firstName: 'John',
          lastName: 'Doe',
        },
      };
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Authentication failed');
    }
  }

  // User registration method
  private async createUserProfile(
    request: CreateUserRequest
  ): Promise<UserProfileResponse> {
    try {
      // This would be a real gRPC call in production
      console.log('Creating user profile for:', request.email);

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Mock successful response
      return {
        id: '1',
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
        profile: request.profileData,
      };
    } catch (error) {
      console.error('User registration error:', error);
      throw new Error('User registration failed');
    }
  }

  // Get user profile method
  private async getUserProfile(userId: string): Promise<UserProfileResponse> {
    try {
      // This would be a real gRPC call in production
      console.log('Getting user profile for ID:', userId);

      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock successful response
      return {
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
      };
    } catch (error) {
      console.error('Get profile error:', error);
      throw new Error('Failed to get user profile');
    }
  }
}

// Create and export a singleton instance
const grpcClient = new GrpcClient(GRPC_ENDPOINT);
export default grpcClient;
