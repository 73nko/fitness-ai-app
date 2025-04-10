import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps {
  /**
   * Button text content
   */
  title: string;
  /**
   * Function called when button is pressed
   */
  onPress: TouchableOpacityProps['onPress'];
  /**
   * Button visual style variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';
  /**
   * Shows loading indicator instead of title
   * @default false
   */
  isLoading?: boolean;
  /**
   * Disables button interactions
   * @default false
   */
  disabled?: boolean;
}

/**
 * Button component with different variants
 */
export function Button(props: ButtonProps) {
  const {
    title,
    onPress,
    variant = 'primary',
    isLoading = false,
    disabled = false,
  } = props;

  // Get container style based on variant and disabled state
  const getContainerStyle = () => {
    if (disabled) {
      return styles.buttonDisabled;
    }

    switch (variant) {
      case 'primary':
        return styles.buttonPrimary;
      case 'secondary':
        return styles.buttonSecondary;
      case 'outline':
        return styles.buttonOutline;
      default:
        return styles.buttonPrimary;
    }
  };

  // Get text style based on variant and disabled state
  const getTextStyle = () => {
    if (disabled) {
      return styles.textDisabled;
    }

    switch (variant) {
      case 'outline':
        return styles.textOutline;
      default:
        return styles.textLight;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getContainerStyle()]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <ActivityIndicator
          size='small'
          color={variant === 'outline' ? '#3B82F6' : '#ffffff'}
        />
      ) : (
        <Text style={[styles.text, getTextStyle()]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#3B82F6',
  },
  buttonSecondary: {
    backgroundColor: '#10B981',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  textLight: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: '#3B82F6',
  },
  textDisabled: {
    color: '#9CA3AF',
  },
});
