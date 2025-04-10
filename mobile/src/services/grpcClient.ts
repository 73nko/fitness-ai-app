import { grpc } from '@improbable-eng/grpc-web';
import Config from 'react-native-config';
import { callUnary, GrpcMethodDefinition } from './grpcHelpers';

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

export interface ExerciseLog {
  exercise_name: string;
  reps: string;
  weight: number;
  rir: number;
  feedback: string;
  created_at: string;
}

export interface GetUserExerciseLogsRequest {
  user_id: string;
  exercise_name?: string;
  days?: number;
}

export interface GetUserExerciseLogsResponse {
  logs: ExerciseLog[];
}

export interface ProgressionSuggestionsRequest {
  user_id: string;
  training_plan_id: string;
  history_weeks: number;
}

export interface ExerciseModificationSuggestion {
  exercise_id: string;
  suggestion: string;
  new_weight?: number;
  replace_with?: string;
}

export interface ProgressionSuggestionsResponse {
  training_plan_id: string;
  deload_recommended: boolean;
  summary: string;
  modified_exercises: ExerciseModificationSuggestion[];
  generated_at: string;
  model_used: string;
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
  getUserExerciseLogs: (
    request: GetUserExerciseLogsRequest
  ) => Promise<GetUserExerciseLogsResponse>;
  generateProgressionSuggestions: (
    request: ProgressionSuggestionsRequest
  ) => Promise<ProgressionSuggestionsResponse>;
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
      getUserExerciseLogs: this.getUserExerciseLogs.bind(this),
      generateProgressionSuggestions:
        this.generateProgressionSuggestions.bind(this),
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

      /*
      // EXAMPLE OF FUTURE IMPLEMENTATION WITH GENERATED PROTO FILES:
      // When proto files are generated, you would use the callUnary function like this:

      // Import the generated service definitions (to be generated)
      // import { AuthenticateUser } from "../proto/user_pb_service";
      // import { LoginRequest, AuthResponse } from "../proto/user_pb";

      // Convert the request to a proper protobuf message
      // const loginRequest = new LoginRequest();
      // loginRequest.setEmail(request.email);
      // loginRequest.setPassword(request.password);

      // Use the callUnary function to make the gRPC call
      // const response = await callUnary<LoginRequest, AuthResponse>(
      //   AuthenticateUser,
      //   loginRequest
      // );

      // Convert the response to our application type
      // return {
      //   token: response.getToken(),
      //   user: {
      //     id: response.getUser().getId(),
      //     email: response.getUser().getEmail(),
      //     firstName: response.getUser().getFirstname(),
      //     lastName: response.getUser().getLastname(),
      //   },
      // };
      */
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

  private async getUserExerciseLogs(
    request: GetUserExerciseLogsRequest
  ): Promise<GetUserExerciseLogsResponse> {
    try {
      // This would be a real gRPC call in production
      console.log('Getting exercise logs for user:', request.user_id);

      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Mock response data
      return {
        logs: this.generateMockExerciseLogs(
          request.user_id,
          request.exercise_name,
          request.days || 30
        ),
      };
    } catch (error) {
      console.error('Get exercise logs error:', error);
      throw new Error('Failed to get exercise logs');
    }
  }

  private generateMockExerciseLogs(
    userId: string,
    exerciseName?: string,
    days: number = 30
  ): ExerciseLog[] {
    // Get a list of exercise names
    const exerciseNames = [
      'Bench Press',
      'Squat',
      'Deadlift',
      'Pull-up',
      'Shoulder Press',
    ];

    // If a specific exercise is requested, filter to that one
    const exercises = exerciseName ? [exerciseName] : exerciseNames;

    const logs: ExerciseLog[] = [];

    // Generate mock data for each exercise
    exercises.forEach((exercise) => {
      // Create entries for the past 'days' days
      for (let i = 0; i < days; i++) {
        // Skip some days randomly to simulate not doing every exercise every session
        if (Math.random() > 0.7) continue;

        const date = new Date();
        date.setDate(date.getDate() - i);

        // For progress visualization, we'll make the weight increase slightly over time
        // and the RIR decrease (showing improvement)
        const baseWeight =
          exercise === 'Bench Press'
            ? 80
            : exercise === 'Squat'
              ? 100
              : exercise === 'Deadlift'
                ? 120
                : exercise === 'Pull-up'
                  ? 0
                  : 60;

        // Slight progress over time (newer dates have higher weight)
        const weight = baseWeight - i * 0.2 + (Math.random() * 5 - 2.5);

        // RIR fluctuates but trends lower (better) over time
        const rir = Math.max(
          0,
          Math.min(5, Math.floor(3 - i * 0.05 + Math.random() * 2))
        );

        logs.push({
          exercise_name: exercise,
          reps: `${8 + Math.floor(Math.random() * 4)}`,
          weight: parseFloat(weight.toFixed(1)),
          rir,
          feedback: ['Good session', 'Feeling strong', 'Challenging', 'Easy'][
            Math.floor(Math.random() * 4)
          ],
          created_at: date.toISOString(),
        });
      }
    });

    // Sort by date, oldest first
    return logs.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }

  private async generateProgressionSuggestions(
    request: ProgressionSuggestionsRequest
  ): Promise<ProgressionSuggestionsResponse> {
    try {
      // This would be a real gRPC call in production
      console.log(
        'Generating progression suggestions for user:',
        request.user_id,
        'training plan:',
        request.training_plan_id
      );

      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock response for development
      return {
        training_plan_id: request.training_plan_id,
        deload_recommended: Math.random() > 0.7, // 30% chance of recommending deload
        summary: `Based on your last ${request.history_weeks} weeks of training, you've been making steady progress. You might benefit from progressively increasing weight on compound lifts and adding volume to isolation exercises.`,
        modified_exercises: [
          {
            exercise_id: 'Barbell Squat',
            suggestion:
              'Increase weight by 5kg for your working sets. Your form has been consistent.',
            new_weight: 85,
          },
          {
            exercise_id: 'Bench Press',
            suggestion:
              'You seem to be plateauing. Try increasing reps before adding weight.',
          },
          {
            exercise_id: 'Lateral Raises',
            suggestion:
              'Consider replacing with Cable Lateral Raises for better tension throughout the range of motion.',
            replace_with: 'Cable Lateral Raises',
          },
        ],
        generated_at: new Date().toISOString(),
        model_used: 'gpt-4',
      };
    } catch (error) {
      console.error('Progression suggestions error:', error);
      throw new Error('Failed to generate progression suggestions');
    }
  }
}

// Create and export a singleton instance
const grpcClient = new GrpcClient(GRPC_ENDPOINT);
export default grpcClient;
