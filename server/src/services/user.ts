import {
  UserResponse,
  ProfileData,
  UpdateProfileRequest,
} from '@shared-types/user'; // Assuming these types exist

export class UserService {
  constructor() {
    console.log('UserService initialized');
  }

  async getUserProfile(userId: string): Promise<UserResponse | null> {
    console.log(`UserService.getUserProfile called with userId: ${userId}`);
    // TODO: Implement actual logic to fetch user profile from DB
    // Return mock data for now
    if (userId === 'mock-user-id') {
      const mockProfileData: ProfileData = {
        age: 30,
        weight: 75,
        height: 180,
        fitnessLevel: 'intermediate',
        fitnessGoals: ['build muscle', 'lose fat'],
        medicalIssues: [],
        availableEquipment: ['dumbbells'],
        trainingPreferences: "{'frequency':'3 times/week'}", // Example JSON string
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockUserResponse: UserResponse = {
        id: userId,
        email: 'mock@example.com',
        firstName: 'Mock', // firstName is on UserResponse
        lastName: 'User', // lastName is on UserResponse
        profile: mockProfileData, // Use 'profile' field with ProfileData
      };
      return Promise.resolve(mockUserResponse);
    }
    return Promise.resolve(null); // Return null if user not found
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileRequest
  ): Promise<UserResponse | null> {
    console.log(
      `UserService.updateProfile called for userId: ${userId} with data:`,
      data
    );
    // TODO: Implement actual logic to update user profile in DB
    // Return mock updated data
    if (userId === 'mock-user-id') {
      // Assuming incoming data is validated against UpdateProfileRequestSchema
      const updatedProfileData: ProfileData = {
        age: data.profileData.age || 30,
        weight: data.profileData.weight || 75,
        height: data.profileData.height || 180,
        fitnessLevel: data.profileData.fitnessLevel || 'intermediate',
        fitnessGoals: data.profileData.fitnessGoals || [
          'build muscle',
          'lose fat',
        ],
        medicalIssues: data.profileData.medicalIssues || [],
        availableEquipment: data.profileData.availableEquipment || [
          'dumbbells',
        ],
        trainingPreferences:
          data.profileData.trainingPreferences ||
          "{'frequency':'3 times/week'}",
        createdAt: new Date().toISOString(), // In real impl, fetch existing and preserve
        updatedAt: new Date().toISOString(),
      };

      // Assuming firstName and lastName are not updated via this endpoint per typical profile update patterns
      const mockUserResponse: UserResponse = {
        id: userId,
        email: 'mock@example.com', // Email is usually not updated via profile endpoint
        firstName: 'Mock', // Keep existing mock name for now
        lastName: 'User', // Keep existing mock name for now
        profile: updatedProfileData, // Use 'profile' field with updated ProfileData
      };
      return Promise.resolve(mockUserResponse);
    }
    return Promise.resolve(null);
  }
}
