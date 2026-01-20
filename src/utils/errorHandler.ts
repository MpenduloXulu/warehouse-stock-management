import { ApiError } from '@/types';

// Custom error class
export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Handle API errors
export const handleApiError = (error: any): ApiError => {
  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error?.response?.data) {
    return {
      code: error.response.status?.toString() || 'UNKNOWN',
      message: error.response.data.message || 'An error occurred',
      details: error.response.data,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: error?.message || 'An unexpected error occurred',
  };
};

// Get error message
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};

// Firebase error handler
export const handleFirebaseError = (error: any): string => {
  const errorCode = error?.code || '';
  const errorMessage = error?.message || '';
  
  // Check for offline/network errors
  if (errorMessage.includes('offline') || errorMessage.includes('Failed to get document')) {
    return 'Unable to connect to Firebase. Please check your internet connection and ensure Firestore is enabled in Firebase Console.';
  }
  
  switch (errorCode) {
    case 'auth/configuration-not-found':
      return 'Firebase Authentication is not enabled. Please enable Email/Password authentication in Firebase Console.';
    case 'auth/user-not-found':
      return 'No user found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/operation-not-allowed':
      return 'Email/Password authentication is not enabled. Please enable it in Firebase Console.';
    case 'auth/too-many-requests':
      return 'Too many requests. Please try again later';
    case 'auth/invalid-api-key':
      return 'Invalid Firebase API key. Please check your configuration.';
    case 'auth/app-deleted':
      return 'Firebase app was deleted. Please check your configuration.';
    case 'auth/invalid-credential':
      return 'Invalid credentials. Please check your Firebase configuration.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'permission-denied':
      return 'Permission denied. Please ensure Firestore is properly configured.';
    case 'unavailable':
      return 'Firebase service is unavailable. Please try again later.';
    case 'not-found':
      return 'Resource not found';
    case 'already-exists':
      return 'Resource already exists';
    case 'unauthenticated':
      return 'You must be logged in';
    default:
      return errorMessage || 'An error occurred';
  }
};
