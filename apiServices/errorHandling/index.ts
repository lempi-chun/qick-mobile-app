import { AxiosError } from 'axios';
import { HTTP_STATUS, errorCase } from '../statusCode';

// Simple toast-like error display (we'll improve this later with proper toast component)
const showError = (message: string) => {
  if (__DEV__) {
    console.error('🚨 Error:', message);
  }
  // TODO: Replace with actual toast component when available
  // For now, we'll just log the error
};

export const handleError = (error: AxiosError | any) => {
  let errorMessage = 'An unexpected error occurred';

  if (error?.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        errorMessage = data?.message || 'Invalid request. Please check your input.';
        break;
      case HTTP_STATUS.UNAUTHORIZED:
        errorMessage = 'Session expired. Please sign in again.';
        break;
      case HTTP_STATUS.FORBIDDEN:
        errorMessage = 'You do not have permission to perform this action.';
        break;
      case HTTP_STATUS.NOT_FOUND:
        errorMessage = 'The requested resource was not found.';
        break;
      case HTTP_STATUS.CONFLICT:
        errorMessage = data?.message || 'A conflict occurred. Please try again.';
        break;
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        errorMessage = data?.message || 'Invalid data provided.';
        break;
      case HTTP_STATUS.TOKEN_EXPIRED:
        errorMessage = 'Your session has expired. Please sign in again.';
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorMessage = 'Server error. Please try again later.';
        break;
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        errorMessage = 'Service temporarily unavailable. Please try again later.';
        break;
      default:
        errorMessage = data?.message || `Error ${status}: Something went wrong.`;
    }

    if (__DEV__) {
      console.log('Response Error:', {
        status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
    }
  } else if (error?.request) {
    // Request was made but no response received
    errorMessage = 'Network error. Please check your connection and try again.';
    
    if (__DEV__) {
      console.log('Request Error:', {
        request: error.request,
        message: error.message,
      });
    }
  } else {
    // Something else happened
    errorMessage = error?.message || errorMessage;
    
    if (__DEV__) {
      console.log('General Error:', error?.message);
    }
  }

  // Show error to user
  showError(errorMessage);

  return {
    type: errorCase,
    message: errorMessage,
    status: error?.response?.status,
    data: error?.response?.data,
  };
}; 