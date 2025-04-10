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

export interface TrainingPlanRequest {
  userId: string;
  name: string;
  description: string;
  daysPerWeek: number;
  focusArea: string;
  sessionDuration: number;
  includeWarmup: boolean;
  includeCooldown: boolean;
}

export interface ExerciseFeedback {
  exercise_name: string;
  reps: string;
  weight: number;
  rir: number;
  notes: string;
}

export interface SubmitSessionFeedbackRequest {
  user_id: string;
  session_id: string;
  exercises_feedback: ExerciseFeedback[];
}

export interface SubmitSessionFeedbackResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

// User service interfaces
interface UserService {
  authenticateUser: (request: LoginRequest) => Promise<AuthResponse>;
  createUserProfile: (
    request: CreateUserRequest
  ) => Promise<UserProfileResponse>;
  getUserProfile: (userId: string) => Promise<UserProfileResponse>;
}

// Training service interfaces
interface TrainingService {
  generateTrainingPlan: (
    request: TrainingPlanRequest
  ) => Promise<TrainingPlanResponse>;
  submitSessionFeedback: (
    request: SubmitSessionFeedbackRequest
  ) => Promise<SubmitSessionFeedbackResponse>;
  getTodaySession: (userId: string) => Promise<TrainingPlanResponse>;
}

// Simplified GrpcClient class
class GrpcClient {
  private endpoint: string;
  private authToken: string | null = null;
  public userService: UserService;
  public trainingService: TrainingService;

  constructor(endpoint: string) {
    this.endpoint = endpoint;

    // Initialize the user service with methods that interact with the gRPC backend
    this.userService = {
      authenticateUser: this.authenticateUser.bind(this),
      createUserProfile: this.createUserProfile.bind(this),
      getUserProfile: this.getUserProfile.bind(this),
    };

    // Initialize the training service
    this.trainingService = {
      generateTrainingPlan: this.generateTrainingPlan.bind(this),
      submitSessionFeedback: this.submitSessionFeedback.bind(this),
      getTodaySession: this.getTodaySession.bind(this),
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

  // Generate training plan method
  private async generateTrainingPlan(
    request: TrainingPlanRequest
  ): Promise<TrainingPlanResponse> {
    try {
      // This would be a real gRPC call in production
      console.log('Generating training plan for user:', request.userId);

      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful response
      return {
        id: '123456',
        userId: request.userId,
        name: request.name,
        description: request.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        generatedBy: 'AI',
        exercises: [
          {
            id: 'ex1',
            name: 'Push-up',
            description:
              'Standard push-up working chest, shoulders, and triceps',
            sets: 3,
            reps: '12-15',
            restTime: 60,
            notes: 'Focus on proper form',
            dayOfWeek: 1,
            order: 1,
          },
          {
            id: 'ex2',
            name: 'Squats',
            description: 'Bodyweight squats for lower body',
            sets: 3,
            reps: '15-20',
            restTime: 60,
            notes: 'Engage core for stability',
            dayOfWeek: 1,
            order: 2,
          },
          {
            id: 'ex3',
            name: 'Plank',
            description: 'Core stabilization exercise',
            sets: 3,
            reps: '30-45 seconds',
            restTime: 45,
            notes: 'Keep body straight',
            dayOfWeek: 1,
            order: 3,
          },
        ],
      };
    } catch (error) {
      console.error('Generate training plan error:', error);
      throw new Error('Failed to generate training plan');
    }
  }

  // Submit session feedback method
  private async submitSessionFeedback(
    request: SubmitSessionFeedbackRequest
  ): Promise<SubmitSessionFeedbackResponse> {
    try {
      // This would be a real gRPC call in production
      console.log('Submitting session feedback for user:', request.user_id);

      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock successful response
      return {
        success: true,
        message: 'Session feedback submitted successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Submit session feedback error:', error);
      throw new Error('Failed to submit session feedback');
    }
  }

  // Get today's training session
  private async getTodaySession(userId: string): Promise<TrainingPlanResponse> {
    try {
      // This would be a real gRPC call in production
      console.log('Getting today session for user:', userId);

      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Get current day of week (0-6, where 0 is Sunday)
      const today = new Date().getDay();

      // Mock successful response with exercises filtered for today
      const mockPlan = this.generateMockTrainingPlan(userId);
      const filteredExercises = mockPlan.exercises.filter(
        (exercise) => exercise.dayOfWeek === today
      );

      return {
        ...mockPlan,
        exercises: filteredExercises,
      };
    } catch (error) {
      console.error('Get today session error:', error);
      throw new Error('Failed to get today session');
    }
  }

  // Helper method to generate a mock training plan
  private generateMockTrainingPlan(userId: string): TrainingPlanResponse {
    return {
      id: '123456',
      userId: userId,
      name: 'Weekly Strength Training',
      description: 'A balanced plan focusing on strength and mobility',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      generatedBy: 'AI',
      exercises: [
        {
          id: 'ex1',
          name: 'Barbell Squat',
          description: 'Compound lower body exercise',
          sets: 4,
          reps: '8-10',
          restTime: 120,
          notes: 'Focus on proper form and depth',
          dayOfWeek: 1, // Monday
          order: 1,
        },
        {
          id: 'ex2',
          name: 'Bench Press',
          description: 'Compound chest exercise',
          sets: 4,
          reps: '8-10',
          restTime: 120,
          notes: 'Keep shoulders retracted',
          dayOfWeek: 1, // Monday
          order: 2,
        },
        {
          id: 'ex3',
          name: 'Deadlift',
          description: 'Compound back exercise',
          sets: 3,
          reps: '6-8',
          restTime: 180,
          notes: 'Use belt for heavy sets',
          dayOfWeek: 3, // Wednesday
          order: 1,
        },
        {
          id: 'ex4',
          name: 'Pull-ups',
          description: 'Upper body pull exercise',
          sets: 3,
          reps: '8-12',
          restTime: 90,
          notes: 'Use assistance band if needed',
          dayOfWeek: 3, // Wednesday
          order: 2,
        },
        {
          id: 'ex5',
          name: 'Overhead Press',
          description: 'Shoulder compound exercise',
          sets: 3,
          reps: '8-10',
          restTime: 120,
          notes: 'Keep core tight',
          dayOfWeek: 5, // Friday
          order: 1,
        },
        {
          id: 'ex6',
          name: 'Barbell Rows',
          description: 'Back compound exercise',
          sets: 3,
          reps: '8-10',
          restTime: 120,
          notes: 'Keep back neutral',
          dayOfWeek: 5, // Friday
          order: 2,
        },
        {
          id: 'ex7',
          name: 'Lunges',
          description: 'Unilateral leg exercise',
          sets: 3,
          reps: '10-12 each leg',
          restTime: 90,
          notes: 'Focus on stability',
          dayOfWeek: new Date().getDay(), // Today
          order: 1,
        },
        {
          id: 'ex8',
          name: 'Push-ups',
          description: 'Bodyweight chest exercise',
          sets: 3,
          reps: '15-20',
          restTime: 60,
          notes: 'Keep body straight',
          dayOfWeek: new Date().getDay(), // Today
          order: 2,
        },
      ],
    };
  }
}

// Create and export a singleton instance
const grpcClient = new GrpcClient(GRPC_ENDPOINT);
export default grpcClient;
