/**
 * Utility functions for form validation
 */

/**
 * Validates an email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password requirements
 * - At least 8 characters
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) return false;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasUppercase && hasLowercase && hasNumber;
}

/**
 * Checks if a string is empty or only whitespace
 */
export function isEmpty(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === '';
}

/**
 * Validates a numeric input is within a given range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Formats validation errors into user-friendly messages
 */
export function getValidationErrors(
  fields: Record<string, any>
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(fields).forEach(([field, value]) => {
    // Email validation
    if (field === 'email' && !isValidEmail(value as string)) {
      errors[field] = 'Please enter a valid email address';
    }

    // Password validation
    if (field === 'password' && !isValidPassword(value as string)) {
      errors[field] =
        'Password must be at least 8 characters and include uppercase, lowercase, and numbers';
    }

    // Required fields
    if (isEmpty(value as string) && !errors[field]) {
      errors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
    }
  });

  return errors;
}
