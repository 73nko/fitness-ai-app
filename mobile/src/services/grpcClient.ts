import { grpc } from '@improbable-eng/grpc-web';
import env from '../config/env';
import { callUnary, GrpcMethodDefinition, GrpcError } from './grpcHelpers';

// Import the generated service and message definitions
import {
  UserServiceServiceName,
  LoginRequest as LoginRequestProto,
  LoginResponse as LoginResponseProto,
  RegisterRequest as RegisterRequestProto,
  UserResponse as UserResponseProto,
  ProfileRequest as ProfileRequestProto,
} from '../generated/user/user';

// Import training service definitions
import {
  GeneratePlanRequest,
  TrainingPlanResponse as TrainingPlanProtoResponse,
  TrainingService as TrainingServiceProto,
  TrainingServiceServiceName,
  Exercise as ExerciseProto,
  SubmitSessionFeedbackRequest as SubmitSessionFeedbackRequestProto,
  SubmitSessionFeedbackResponse as SubmitSessionFeedbackResponseProto,
  ProgressRequest,
  ProgressResponse,
  ExerciseProgress,
  ProgressPoint,
  ProgressionSuggestionsRequest as ProgressionSuggestionsRequestProto,
  ProgressionSuggestionsResponse as ProgressionSuggestionsResponseProto,
  ExerciseModificationSuggestion as ExerciseModificationSuggestionProto,
} from '../generated/training/training';

// Define service endpoints
const GRPC_ENDPOINT = env.GRPC_ENDPOINT;

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
      console.log('Authenticating user:', request.email);

      // Create the gRPC request message using the create method
      const loginRequest = LoginRequestProto.create({
        email: request.email,
        password: request.password,
      });

      // Define the Login method from the UserService
      const loginMethod: GrpcMethodDefinition<any, any> = {
        methodName: 'Login',
        service: { serviceName: UserServiceServiceName },
        requestStream: false,
        responseStream: false,
        requestType: {
          new: () => LoginRequestProto.create({}),
          encode: (message: any, writer?: any) =>
            LoginRequestProto.encode(message, writer),
        } as any,
        responseType: {
          new: () => LoginResponseProto.create({}),
          decode: (reader: any, length?: number) =>
            LoginResponseProto.decode(reader, length),
        } as any,
      };

      // Make the gRPC call (no auth token needed for login)
      const response = await callUnary<any, any>(loginMethod, loginRequest);

      // We know the response is a LoginResponseProto, so we can safely access its properties
      const typedResponse = response as ReturnType<
        typeof LoginResponseProto.create
      >;

      // Store the auth token for future requests
      this.setAuthToken(typedResponse.token);

      // Convert the gRPC response to the frontend type
      return {
        token: typedResponse.token,
        user: {
          id: typedResponse.user?.id || '',
          email: typedResponse.user?.email || '',
          firstName: typedResponse.user?.firstName || '',
          lastName: typedResponse.user?.lastName || '',
        },
      };
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  // User registration method
  private async createUserProfile(
    request: CreateUserRequest
  ): Promise<UserProfileResponse> {
    try {
      console.log('Creating user profile for:', request.email);

      // Create profile data if provided
      const profileData = request.profileData
        ? {
            age: request.profileData.age,
            weight: request.profileData.weight,
            height: request.profileData.height,
            fitnessLevel: request.profileData.fitnessLevel,
            fitnessGoals: request.profileData.fitnessGoals || [],
            medicalIssues: request.profileData.medicalIssues || [],
            availableEquipment: request.profileData.availableEquipment || [],
            trainingPreferences: request.profileData.trainingPreferences,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : undefined;

      // Create the gRPC request message using the create method
      const registerRequest = RegisterRequestProto.create({
        email: request.email,
        password: request.password,
        firstName: request.firstName,
        lastName: request.lastName,
        profileData,
      });

      // Define the Register method from the UserService
      const registerMethod: GrpcMethodDefinition<any, any> = {
        methodName: 'Register',
        service: { serviceName: UserServiceServiceName },
        requestStream: false,
        responseStream: false,
        requestType: {
          new: () => RegisterRequestProto.create({}),
          encode: (message: any, writer?: any) =>
            RegisterRequestProto.encode(message, writer),
        } as any,
        responseType: {
          new: () => UserResponseProto.create({}),
          decode: (reader: any, length?: number) =>
            UserResponseProto.decode(reader, length),
        } as any,
      };

      // Make the gRPC call (use auth token if available)
      const response = await callUnary<any, any>(
        registerMethod,
        registerRequest,
        this.authToken || undefined
      );

      // We know the response is a UserResponseProto, so we can safely access its properties
      const typedResponse = response as ReturnType<
        typeof UserResponseProto.create
      >;

      // Convert the gRPC response to the frontend type
      return {
        id: typedResponse.id,
        email: typedResponse.email,
        firstName: typedResponse.firstName,
        lastName: typedResponse.lastName,
        profile: typedResponse.profile
          ? {
              age: typedResponse.profile.age,
              weight: typedResponse.profile.weight,
              height: typedResponse.profile.height,
              fitnessLevel: typedResponse.profile.fitnessLevel,
              fitnessGoals: typedResponse.profile.fitnessGoals,
              medicalIssues: typedResponse.profile.medicalIssues,
              availableEquipment: typedResponse.profile.availableEquipment,
              trainingPreferences: typedResponse.profile.trainingPreferences,
            }
          : undefined,
      };
    } catch (error) {
      console.error('User creation error:', error);
      throw error;
    }
  }

  // Get user profile method
  private async getUserProfile(userId: string): Promise<UserProfileResponse> {
    try {
      console.log('Getting user profile for ID:', userId);

      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      // Create the gRPC request message
      const profileRequest = ProfileRequestProto.create({
        userId: userId,
      });

      // Define the GetProfile method from the UserService
      const getProfileMethod: GrpcMethodDefinition<any, any> = {
        methodName: 'GetProfile',
        service: { serviceName: UserServiceServiceName },
        requestStream: false,
        responseStream: false,
        requestType: {
          new: () => ProfileRequestProto.create({}),
          encode: (message: any, writer?: any) =>
            ProfileRequestProto.encode(message, writer),
        } as any,
        responseType: {
          new: () => UserResponseProto.create({}),
          decode: (reader: any, length?: number) =>
            UserResponseProto.decode(reader, length),
        } as any,
      };

      // Make the gRPC call with auth token
      const response = await callUnary<any, any>(
        getProfileMethod,
        profileRequest,
        this.authToken
      );

      // We know the response is a UserResponseProto
      const typedResponse = response as ReturnType<
        typeof UserResponseProto.create
      >;

      // Convert the gRPC response to the frontend type
      return {
        id: typedResponse.id,
        email: typedResponse.email,
        firstName: typedResponse.firstName,
        lastName: typedResponse.lastName,
        profile: typedResponse.profile
          ? {
              age: typedResponse.profile.age,
              weight: typedResponse.profile.weight,
              height: typedResponse.profile.height,
              fitnessLevel: typedResponse.profile.fitnessLevel,
              fitnessGoals: typedResponse.profile.fitnessGoals,
              medicalIssues: typedResponse.profile.medicalIssues,
              availableEquipment: typedResponse.profile.availableEquipment,
              trainingPreferences: typedResponse.profile.trainingPreferences,
            }
          : undefined,
      };
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  // Generate training plan method
  private async generateTrainingPlan(
    request: TrainingPlanRequest
  ): Promise<TrainingPlanResponse> {
    try {
      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      console.log('Generating training plan for user:', request.userId);

      // Create the GeneratePlanRequest object from our frontend type
      const grpcRequest = GeneratePlanRequest.create({
        userId: request.userId,
        planName: request.name,
        description: request.description,
        // Additional fields can be added as needed based on proto definition
      });

      // Define the GenerateTrainingPlan method
      const generateTrainingPlanMethod: GrpcMethodDefinition<any, any> = {
        methodName: 'GenerateTrainingPlan',
        service: { serviceName: TrainingServiceServiceName },
        requestStream: false,
        responseStream: false,
        requestType: {
          new: () => GeneratePlanRequest.create({}),
          encode: (message: any, writer?: any) =>
            GeneratePlanRequest.encode(message, writer),
        } as any,
        responseType: {
          new: () => TrainingPlanProtoResponse.create({}),
          decode: (reader: any, length?: number) =>
            TrainingPlanProtoResponse.decode(reader, length),
        } as any,
      };

      // Call the gRPC endpoint using callUnary
      const response = await callUnary(
        generateTrainingPlanMethod,
        grpcRequest,
        this.authToken
      );

      // Convert the gRPC response to our frontend type
      // Assuming response.trainingPlan contains the plan data
      const trainingPlan = response.trainingPlan;
      if (!trainingPlan) {
        throw new Error('No training plan received from server');
      }

      // Map the response to our frontend type
      return {
        id: trainingPlan.id,
        userId: trainingPlan.userId,
        name: trainingPlan.name,
        description: trainingPlan.description || '',
        createdAt: trainingPlan.createdAt,
        updatedAt: trainingPlan.updatedAt,
        isActive: trainingPlan.isActive,
        generatedBy: trainingPlan.generatedBy,
        exercises: trainingPlan.exercises.map((exercise: ExerciseProto) => ({
          id: exercise.id,
          name: exercise.name,
          description: exercise.description || '',
          sets: exercise.sets,
          reps: exercise.reps,
          restTime: exercise.restTime || 60,
          notes: exercise.notes || '',
          dayOfWeek: exercise.dayOfWeek,
          order: exercise.order,
        })),
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
      console.log('Submitting session feedback for user:', request.user_id);

      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      // Convert frontend request to proto format
      const protoRequest = SubmitSessionFeedbackRequestProto.create({
        userId: request.user_id,
        sessionId: request.session_id,
        exercisesFeedback: request.exercises_feedback.map((feedback) => ({
          exerciseName: feedback.exercise_name,
          reps: feedback.reps,
          weight: feedback.weight,
          rir: feedback.rir,
          notes: feedback.notes,
        })),
      });

      // Define the gRPC method
      const submitFeedbackMethod: GrpcMethodDefinition<any, any> = {
        methodName: 'SubmitSessionFeedback',
        service: { serviceName: TrainingServiceServiceName },
        requestStream: false,
        responseStream: false,
        requestType: {
          new: () => SubmitSessionFeedbackRequestProto.create({}),
          encode: (message: any, writer?: any) =>
            SubmitSessionFeedbackRequestProto.encode(message, writer),
        } as any,
        responseType: {
          new: () => SubmitSessionFeedbackResponseProto.create({}),
          decode: (reader: any, length?: number) =>
            SubmitSessionFeedbackResponseProto.decode(reader, length),
        } as any,
      };

      // Make the gRPC call
      const response = await callUnary<any, any>(
        submitFeedbackMethod,
        protoRequest,
        this.authToken
      );

      // Type the response correctly
      const typedResponse = response as ReturnType<
        typeof SubmitSessionFeedbackResponseProto.create
      >;

      // Convert proto response to frontend format
      return {
        success: typedResponse.success,
        message: typedResponse.message,
        timestamp: new Date().toISOString(), // Add timestamp if not present in proto
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
      console.log('Getting exercise logs for user:', request.user_id);

      // Check if we have an auth token
      if (!this.authToken) {
        throw new Error('Authentication required');
      }

      // Calculate date range based on days parameter (if provided)
      let startDate: string | undefined;
      if (request.days) {
        const start = new Date();
        start.setDate(start.getDate() - request.days);
        startDate = start.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      }

      // Create the gRPC request message
      const progressRequest = ProgressRequest.create({
        userId: request.user_id,
        startDate: startDate,
      });

      // Define the GetUserProgress method from the TrainingService
      const progressMethod: GrpcMethodDefinition<any, any> = {
        methodName: 'GetUserProgress',
        service: { serviceName: TrainingServiceServiceName },
        requestStream: false,
        responseStream: false,
        requestType: {
          new: () => ProgressRequest.create({}),
          encode: (message: any, writer?: any) =>
            ProgressRequest.encode(message, writer),
        } as any,
        responseType: {
          new: () => ProgressResponse.create({}),
          decode: (reader: any, length?: number) =>
            ProgressResponse.decode(reader, length),
        } as any,
      };

      // Make the gRPC call
      const response = await callUnary<ProgressRequest, ProgressResponse>(
        progressMethod,
        progressRequest,
        this.authToken
      );

      // Transform the ProgressResponse into the ExerciseLog format
      const logs: ExerciseLog[] = [];

      response.exerciseProgress.forEach((exercise: ExerciseProgress) => {
        // Skip if we're filtering by exercise name and this isn't it
        if (
          request.exercise_name &&
          exercise.exerciseName.toLowerCase() !==
            request.exercise_name.toLowerCase()
        ) {
          return;
        }

        // Add each progress point as a log entry
        exercise.progressPoints.forEach((point: ProgressPoint) => {
          if (point.date) {
            logs.push({
              exercise_name: exercise.exerciseName,
              reps: point.totalReps ? point.totalReps.toString() : '0',
              weight: point.weight || 0,
              rir: 0, // RIR not provided in progress data
              feedback: '', // Feedback not provided in progress data
              created_at: point.date,
            });
          }
        });
      });

      // Sort by date, oldest first (for consistent visualization)
      logs.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      return { logs };
    } catch (error) {
      console.error('Get exercise logs error:', error);
      throw new Error('Failed to get exercise logs');
    }
  }

  private async generateProgressionSuggestions(
    request: ProgressionSuggestionsRequest
  ): Promise<ProgressionSuggestionsResponse> {
    try {
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

      // Create the proto request message
      const req = ProgressionSuggestionsRequestProto.create({
        userId: request.user_id,
        trainingPlanId: request.training_plan_id,
        historyWeeks: request.history_weeks,
      });

      // Define the method details for the GenerateProgressionSuggestions endpoint
      const progressionMethod: GrpcMethodDefinition<any, any> = {
        methodName: 'GenerateProgressionSuggestions',
        service: { serviceName: TrainingServiceServiceName },
        requestStream: false,
        responseStream: false,
        requestType: {
          new: () => ProgressionSuggestionsRequestProto.create({}),
          encode: (msg: any, writer?: any) =>
            ProgressionSuggestionsRequestProto.encode(msg, writer),
        } as any,
        responseType: {
          new: () => ProgressionSuggestionsResponseProto.create({}),
          decode: (reader: any, length?: number) =>
            ProgressionSuggestionsResponseProto.decode(reader, length),
        } as any,
      };

      // Make the gRPC call
      const response = await callUnary<
        ProgressionSuggestionsRequestProto,
        ProgressionSuggestionsResponseProto
      >(progressionMethod, req, this.authToken);

      // Convert the proto response to our frontend type
      return {
        training_plan_id: response.trainingPlanId,
        deload_recommended: response.deloadRecommended,
        summary: response.summary,
        modified_exercises: response.modifiedExercises.map((exercise) => ({
          exercise_id: exercise.exerciseId,
          suggestion: exercise.suggestion,
          new_weight: exercise.newWeight || undefined,
          replace_with: exercise.replaceWith || undefined,
        })),
        generated_at: response.generatedAt,
        model_used: response.modelUsed,
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
