import { z } from 'zod';

// Corresponds to user.ProfileData
export const ProfileDataSchema = z.object({
  age: z.number().int().optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
  fitnessLevel: z.string().optional(),
  fitnessGoals: z.array(z.string()).optional(), //chnaged from repeated string
  medicalIssues: z.array(z.string()).optional(), //chnaged from repeated string
  availableEquipment: z.array(z.string()).optional(), //chnaged from repeated string
  trainingPreferences: z.string().optional(), // JSON string
  createdAt: z.string(), // Assuming datetime string
  updatedAt: z.string(), // Assuming datetime string
});
export type ProfileData = z.infer<typeof ProfileDataSchema>;

// Corresponds to user.RegisterRequest
export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profileData: ProfileDataSchema.optional(),
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

// Corresponds to user.LoginRequest
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// Corresponds to user.UserData
export const UserDataSchema = z.object({
  id: z.string(), // Assuming UUID or general string ID
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.string(), // Assuming datetime string
  updatedAt: z.string(), // Assuming datetime string
});
export type UserData = z.infer<typeof UserDataSchema>;

// Corresponds to user.LoginResponse
export const LoginResponseSchema = z.object({
  token: z.string(),
  user: UserDataSchema,
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Corresponds to user.ProfileRequest
export const ProfileRequestSchema = z.object({
  userId: z.string(),
});
export type ProfileRequest = z.infer<typeof ProfileRequestSchema>;

// Corresponds to user.UpdateProfileRequest
export const UpdateProfileRequestSchema = z.object({
  userId: z.string(),
  profileData: ProfileDataSchema, // Note: In proto it's not optional here, but ProfileData itself has optional fields
});
export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;

// Corresponds to user.UserResponse (used in Register)
export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  profile: ProfileDataSchema.optional(),
});
export type UserResponse = z.infer<typeof UserResponseSchema>;

// Corresponds to user.ProfileResponse (used in GetProfile and UpdateProfile)
export const ProfileResponseSchema = z.object({
  user: UserDataSchema,
  profile: ProfileDataSchema, // Note: In proto it's not optional here
});
export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
