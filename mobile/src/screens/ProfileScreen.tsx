import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation';
import { useAuth } from '../context/AuthContext';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <View className='bg-white rounded-xl p-5 shadow-md mb-4'>
      <Text className='text-xl font-bold mb-3 text-text'>{title}</Text>
      {children}
    </View>
  );
}

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, logout } = useAuth();

  return (
    <ScrollView className='flex-1 bg-background p-4'>
      <ProfileSection title='Your Information'>
        <View className='space-y-2'>
          <Text className='text-text-muted'>Name</Text>
          <Text className='text-text font-medium'>John Doe</Text>

          <Text className='text-text-muted mt-2'>Email</Text>
          <Text className='text-text font-medium'>john.doe@example.com</Text>

          <Text className='text-text-muted mt-2'>Fitness Level</Text>
          <Text className='text-text font-medium'>Intermediate</Text>
        </View>
      </ProfileSection>

      <ProfileSection title='Stats'>
        <View className='flex-row justify-between'>
          <View className='items-center'>
            <Text className='text-primary text-2xl font-bold'>12</Text>
            <Text className='text-text-muted'>Workouts</Text>
          </View>

          <View className='items-center'>
            <Text className='text-primary text-2xl font-bold'>3</Text>
            <Text className='text-text-muted'>Plans</Text>
          </View>

          <View className='items-center'>
            <Text className='text-primary text-2xl font-bold'>28</Text>
            <Text className='text-text-muted'>Days active</Text>
          </View>
        </View>
      </ProfileSection>

      <ProfileSection title='Account'>
        <TouchableOpacity
          className='bg-gray-200 p-4 rounded-lg mb-3'
          onPress={() => console.log('Edit profile')}>
          <Text className='text-text font-semibold text-center'>
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='bg-red-100 p-4 rounded-lg'
          onPress={() => logout()}>
          <Text className='text-red-500 font-semibold text-center'>Logout</Text>
        </TouchableOpacity>
      </ProfileSection>
    </ScrollView>
  );
}
