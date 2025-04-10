import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ExerciseData } from '../services/grpcClient';

interface ExerciseFeedbackFormProps {
  exercise: ExerciseData;
  feedback: ExerciseFeedbackState;
  onChange: (
    exerciseId: string,
    field: keyof ExerciseFeedbackState,
    value: string | number
  ) => void;
  isLast: boolean;
  onNext?: () => void;
}

export interface ExerciseFeedbackState {
  exerciseId: string;
  exerciseName: string;
  completedSets: string;
  reps: string;
  weight: string;
  rir: string;
  notes: string;
}

export default function ExerciseFeedbackForm({
  exercise,
  feedback,
  onChange,
  isLast,
  onNext,
}: ExerciseFeedbackFormProps) {
  const handleTextChange = (
    field: keyof ExerciseFeedbackState,
    value: string
  ) => {
    onChange(exercise.id, field, value);
  };

  const handleNumericChange = (
    field: keyof ExerciseFeedbackState,
    value: string
  ) => {
    // Only allow numeric input with decimal point for weight
    if (field === 'weight') {
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        onChange(exercise.id, field, value);
      }
    } else {
      // For other numeric fields, only allow integers
      if (value === '' || /^\d+$/.test(value)) {
        onChange(exercise.id, field, value);
      }
    }
  };

  const isRIRValid = (rir: string): boolean => {
    const rirNum = parseInt(rir, 10);
    return !isNaN(rirNum) && rirNum >= 0 && rirNum <= 5;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.description}>{exercise.description}</Text>

      <View style={styles.targetInfo}>
        <Text style={styles.targetText}>
          Target: {exercise.sets} sets × {exercise.reps} reps
        </Text>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Completed Sets</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder={`${exercise.sets}`}
            value={feedback.completedSets}
            onChangeText={(value) =>
              handleNumericChange('completedSets', value)
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Reps per Set</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder={exercise.reps}
            value={feedback.reps}
            onChangeText={(value) => handleTextChange('reps', value)}
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType='decimal-pad'
            placeholder='0.0'
            value={feedback.weight}
            onChangeText={(value) => handleNumericChange('weight', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>RIR (0-5)</Text>
          <TextInput
            style={[
              styles.input,
              feedback.rir !== '' &&
                !isRIRValid(feedback.rir) &&
                styles.invalidInput,
            ]}
            keyboardType='numeric'
            placeholder='0'
            value={feedback.rir}
            onChangeText={(value) => handleNumericChange('rir', value)}
          />
          {feedback.rir !== '' && !isRIRValid(feedback.rir) && (
            <Text style={styles.errorText}>RIR must be 0-5</Text>
          )}
        </View>
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={styles.notesInput}
          placeholder='Any observations about this exercise...'
          multiline
          numberOfLines={3}
          textAlignVertical='top'
          value={feedback.notes}
          onChangeText={(value) => handleTextChange('notes', value)}
        />
      </View>

      {onNext && (
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>
            {isLast ? 'Review All' : 'Next Exercise'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#3B82F6',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
  },
  targetInfo: {
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  targetText: {
    color: '#1E40AF',
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#4B5563',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  invalidInput: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 2,
  },
  notesContainer: {
    marginTop: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    minHeight: 80,
  },
  nextButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
