import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation';
import { useAuth } from '../context/AuthContext';
import grpcClient, {
  ExerciseData,
  ExerciseFeedback,
  SubmitSessionFeedbackRequest,
} from '../services/grpcClient';
import ExerciseFeedbackForm, {
  ExerciseFeedbackState,
} from '../components/ExerciseFeedbackForm';

type SessionFeedbackScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SessionFeedback'
>;

type SessionFeedbackScreenRouteProp = RouteProp<
  RootStackParamList,
  'SessionFeedback'
>;

export default function SessionFeedbackScreen() {
  const navigation = useNavigation<SessionFeedbackScreenNavigationProp>();
  const route = useRoute<SessionFeedbackScreenRouteProp>();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [formData, setFormData] = useState<
    Record<string, ExerciseFeedbackState>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Fetch session data using sessionId from route params if available
  useEffect(() => {
    const fetchSessionData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        // Prioritize using sessionId from route params if available
        const sessionId = route.params?.sessionId;
        let sessionData;

        if (sessionId) {
          // Here you would ideally fetch the specific session by sessionId
          // This is just a placeholder - implement the actual call based on your API
          sessionData = await grpcClient.trainingService.getTodaySession(
            user.id
          );
          // In a production app, you'd have something like:
          // sessionData = await grpcClient.trainingService.getSessionById(sessionId);
        } else {
          // Fallback to getting today's session if no sessionId provided
          sessionData = await grpcClient.trainingService.getTodaySession(
            user.id
          );
        }

        if (sessionData.exercises.length === 0) {
          setError('No exercises found for this session');
        } else {
          setExercises(sessionData.exercises);

          // Initialize form data for each exercise
          const initialFormData: Record<string, ExerciseFeedbackState> = {};
          sessionData.exercises.forEach((exercise) => {
            initialFormData[exercise.id] = {
              exerciseId: exercise.id,
              exerciseName: exercise.name,
              completedSets: '',
              reps: '',
              weight: '',
              rir: '',
              notes: '',
            };
          });

          setFormData(initialFormData);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load workout session');
        console.error('Error fetching session data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionData();
  }, [user, route.params]);

  // Handle form field changes
  const handleFormChange = useCallback(
    (
      exerciseId: string,
      field: keyof ExerciseFeedbackState,
      value: string | number
    ) => {
      setFormData((prev) => ({
        ...prev,
        [exerciseId]: {
          ...prev[exerciseId],
          [field]: value,
        },
      }));
    },
    []
  );

  // Validate all form data
  const validateFormData = useCallback((): boolean => {
    for (const exerciseId in formData) {
      const data = formData[exerciseId];

      // Required fields: completedSets, reps, weight, rir
      if (!data.completedSets || !data.reps || !data.weight || !data.rir) {
        return false;
      }

      // Validate RIR (0-5)
      const rirNum = parseInt(data.rir, 10);
      if (isNaN(rirNum) || rirNum < 0 || rirNum > 5) {
        return false;
      }
    }

    return true;
  }, [formData]);

  // Submit feedback data
  const handleSubmit = useCallback(async () => {
    if (!user) {
      setError('User authentication required');
      return;
    }

    if (!validateFormData()) {
      Alert.alert(
        'Incomplete Information',
        'Please fill in all required fields for each exercise (sets, reps, weight, and RIR).',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Format data for API request
      const exercisesFeedback: ExerciseFeedback[] = Object.values(formData).map(
        (data) => ({
          exercise_name: data.exerciseName,
          reps: data.reps,
          weight: parseFloat(data.weight),
          rir: parseInt(data.rir, 10),
          notes: data.notes || '',
        })
      );

      // Submit feedback
      const request: SubmitSessionFeedbackRequest = {
        user_id: user.id,
        session_id: route.params?.sessionId || new Date().toISOString(),
        exercises_feedback: exercisesFeedback,
      };

      const response =
        await grpcClient.trainingService.submitSessionFeedback(request);

      if (response.success) {
        Alert.alert(
          'Success',
          'Your workout feedback has been submitted successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            },
          ]
        );
      } else {
        setError('Failed to submit workout feedback');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit workout feedback');
      console.error('Error submitting session feedback:', err);

      Alert.alert('Error', err.message || 'Failed to submit workout feedback', [
        { text: 'OK' },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }, [user, formData, route.params, navigation, validateFormData]);

  // Toggle review mode
  const toggleReviewMode = useCallback(() => {
    setIsReviewMode((prev) => !prev);
  }, []);

  // Render exercise item in the list
  const renderExerciseItem = useCallback(
    ({ item }: { item: ExerciseData }) => (
      <ExerciseFeedbackForm
        exercise={item}
        feedback={formData[item.id]}
        onChange={handleFormChange}
        isLast={false}
      />
    ),
    [formData, handleFormChange]
  );

  // Render review item in the list
  const renderReviewItem = useCallback(
    ({ item }: { item: ExerciseData }) => (
      <View key={item.id} style={styles.reviewItem}>
        <Text style={styles.reviewExerciseName}>{item.name}</Text>
        <View style={styles.reviewDetails}>
          <Text style={styles.reviewText}>
            Sets: {formData[item.id]?.completedSets || '-'}
          </Text>
          <Text style={styles.reviewText}>
            Reps: {formData[item.id]?.reps || '-'}
          </Text>
          <Text style={styles.reviewText}>
            Weight: {formData[item.id]?.weight || '-'} kg
          </Text>
          <Text style={styles.reviewText}>
            RIR: {formData[item.id]?.rir || '-'}
          </Text>
          {formData[item.id]?.notes ? (
            <Text style={styles.reviewNotes}>
              Notes: {formData[item.id].notes}
            </Text>
          ) : null}
        </View>
      </View>
    ),
    [formData]
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#3B82F6' />
        <Text style={styles.loadingText}>Loading workout session...</Text>
      </View>
    );
  }

  if (error && exercises.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          {isReviewMode ? 'Review Your Workout' : 'Session Feedback'}
        </Text>
        <Text style={styles.subtitle}>
          {isReviewMode
            ? 'Please confirm your workout details below'
            : `Complete feedback for ${exercises.length} exercises`}
        </Text>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={isReviewMode ? renderReviewItem : renderExerciseItem}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.buttonContainer}>
        {isReviewMode ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={toggleReviewMode}
              disabled={isSubmitting}>
              <Text style={styles.secondaryButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator size='small' color='white' />
              ) : (
                <Text style={styles.buttonText}>Submit Workout</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={toggleReviewMode}>
            <Text style={styles.buttonText}>Review All</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4B5563',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 8,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    minWidth: 120,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3B82F6',
    marginRight: 12,
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  reviewItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  reviewExerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 8,
  },
  reviewDetails: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  reviewText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 4,
  },
  reviewNotes: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 4,
    fontStyle: 'italic',
  },
});
