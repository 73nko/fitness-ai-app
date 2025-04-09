import { PrismaClient } from '../../../../generated/prisma';
import { sendResponse } from '../../../utils/grpcHelper';
import * as grpc from '@grpc/grpc-js';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';

// Types for the handler interface
interface UserHandlerDependencies {
  prisma: PrismaClient;
  jwtSecret: string;
  tokenExpiryTime: number;
}

// Define the gRPC handler with proper TypeScript interfaces
function createUserServiceHandler({
  prisma,
  jwtSecret,
  tokenExpiryTime,
}: UserHandlerDependencies) {
  // Register a new user
  const register = async (call: any, callback: any) => {
    try {
      const { email, password, first_name, last_name, profile_data } =
        call.request;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return sendResponse({
          callback,
          error: {
            code: grpc.status.ALREADY_EXISTS,
            message: 'User with this email already exists',
          },
        });
      }

      // Hash password
      const hashedPassword = await hash(password, 10);

      // Create user with profile if provided
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName: first_name,
          lastName: last_name,
          age: profile_data?.age,
          weight: profile_data?.weight,
          height: profile_data?.height,
          ...(profile_data && {
            profile: {
              create: {
                fitnessLevel: profile_data.fitness_level,
                fitnessGoals: profile_data.fitness_goals,
                medicalIssues: profile_data.medical_issues,
                availableEquipment: profile_data.available_equipment,
                trainingPreferences: profile_data.training_preferences
                  ? JSON.parse(profile_data.training_preferences)
                  : undefined,
              },
            },
          }),
        },
        include: {
          profile: true,
        },
      });

      // Format the response
      return sendResponse({
        callback,
        data: {
          id: newUser.id,
          email: newUser.email,
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          profile: newUser.profile
            ? {
                age: newUser.age,
                weight: newUser.weight,
                height: newUser.height,
                fitness_level: newUser.profile.fitnessLevel,
                fitness_goals: newUser.profile.fitnessGoals,
                medical_issues: newUser.profile.medicalIssues,
                available_equipment: newUser.profile.availableEquipment,
                training_preferences: JSON.stringify(
                  newUser.profile.trainingPreferences
                ),
                created_at: newUser.profile.createdAt.toISOString(),
                updated_at: newUser.profile.updatedAt.toISOString(),
              }
            : undefined,
        },
      });
    } catch (error) {
      return sendResponse({
        callback,
        error: {
          code: grpc.status.INTERNAL,
          message: `Internal error: ${error}`,
        },
      });
    }
  };

  // Login user
  const login = async (call: any, callback: any) => {
    try {
      const { email, password } = call.request;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        include: { profile: true },
      });

      if (!user) {
        return sendResponse({
          callback,
          error: {
            code: grpc.status.NOT_FOUND,
            message: 'User not found',
          },
        });
      }

      // Verify password
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return sendResponse({
          callback,
          error: {
            code: grpc.status.UNAUTHENTICATED,
            message: 'Invalid credentials',
          },
        });
      }

      // Generate JWT token
      const token = sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn: tokenExpiryTime,
      });

      // Return token and user data
      return sendResponse({
        callback,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            created_at: user.createdAt.toISOString(),
            updated_at: user.updatedAt.toISOString(),
          },
        },
      });
    } catch (error) {
      return sendResponse({
        callback,
        error: {
          code: grpc.status.INTERNAL,
          message: `Internal error: ${error}`,
        },
      });
    }
  };

  // Get user profile
  const getProfile = async (call: any, callback: any) => {
    try {
      const { user_id } = call.request;

      // Find user with profile
      const user = await prisma.user.findUnique({
        where: { id: user_id },
        include: { profile: true },
      });

      if (!user) {
        return sendResponse({
          callback,
          error: {
            code: grpc.status.NOT_FOUND,
            message: 'User not found',
          },
        });
      }

      // Return profile data
      return sendResponse({
        callback,
        data: {
          user: {
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            created_at: user.createdAt.toISOString(),
            updated_at: user.updatedAt.toISOString(),
          },
          profile: user.profile
            ? {
                age: user.age,
                weight: user.weight,
                height: user.height,
                fitness_level: user.profile.fitnessLevel,
                fitness_goals: user.profile.fitnessGoals,
                medical_issues: user.profile.medicalIssues,
                available_equipment: user.profile.availableEquipment,
                training_preferences: JSON.stringify(
                  user.profile.trainingPreferences
                ),
                created_at: user.profile.createdAt.toISOString(),
                updated_at: user.profile.updatedAt.toISOString(),
              }
            : undefined,
        },
      });
    } catch (error) {
      return sendResponse({
        callback,
        error: {
          code: grpc.status.INTERNAL,
          message: `Internal error: ${error}`,
        },
      });
    }
  };

  // Update user profile
  const updateProfile = async (call: any, callback: any) => {
    try {
      const { user_id, profile_data } = call.request;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: user_id },
        include: { profile: true },
      });

      if (!user) {
        return sendResponse({
          callback,
          error: {
            code: grpc.status.NOT_FOUND,
            message: 'User not found',
          },
        });
      }

      // Update user fields (age, weight, height)
      const updatedUser = await prisma.user.update({
        where: { id: user_id },
        data: {
          age: profile_data.age ?? undefined,
          weight: profile_data.weight ?? undefined,
          height: profile_data.height ?? undefined,
        },
      });

      // Update or create profile
      const updatedProfile = await prisma.profile.upsert({
        where: {
          userId: user_id,
        },
        update: {
          fitnessLevel: profile_data.fitness_level ?? undefined,
          fitnessGoals: profile_data.fitness_goals ?? undefined,
          medicalIssues: profile_data.medical_issues ?? undefined,
          availableEquipment: profile_data.available_equipment ?? undefined,
          trainingPreferences: profile_data.training_preferences
            ? JSON.parse(profile_data.training_preferences)
            : undefined,
        },
        create: {
          userId: user_id,
          fitnessLevel: profile_data.fitness_level,
          fitnessGoals: profile_data.fitness_goals,
          medicalIssues: profile_data.medical_issues,
          availableEquipment: profile_data.available_equipment,
          trainingPreferences: profile_data.training_preferences
            ? JSON.parse(profile_data.training_preferences)
            : undefined,
        },
      });

      // Return updated profile
      return sendResponse({
        callback,
        data: {
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            first_name: updatedUser.firstName,
            last_name: updatedUser.lastName,
            created_at: updatedUser.createdAt.toISOString(),
            updated_at: updatedUser.updatedAt.toISOString(),
          },
          profile: {
            age: updatedUser.age,
            weight: updatedUser.weight,
            height: updatedUser.height,
            fitness_level: updatedProfile.fitnessLevel,
            fitness_goals: updatedProfile.fitnessGoals,
            medical_issues: updatedProfile.medicalIssues,
            available_equipment: updatedProfile.availableEquipment,
            training_preferences: JSON.stringify(
              updatedProfile.trainingPreferences
            ),
            created_at: updatedProfile.createdAt.toISOString(),
            updated_at: updatedProfile.updatedAt.toISOString(),
          },
        },
      });
    } catch (error) {
      return sendResponse({
        callback,
        error: {
          code: grpc.status.INTERNAL,
          message: `Internal error: ${error}`,
        },
      });
    }
  };

  // Return the handler methods
  return {
    Register: register,
    Login: login,
    GetProfile: getProfile,
    UpdateProfile: updateProfile,
  };
}

export default createUserServiceHandler;
