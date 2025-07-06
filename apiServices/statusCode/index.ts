// HTTP Status Codes
export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Redirect
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  // Custom
  TOKEN_EXPIRED: 498,
} as const;

// Legacy exports for backward compatibility
export const multipleChoices = HTTP_STATUS.MULTIPLE_CHOICES;
export const success = HTTP_STATUS.OK;
export const errorCase = 'Error';
export const tokenExpireCase = HTTP_STATUS.TOKEN_EXPIRED;

// Helper function to check if status code indicates success
export const isSuccessStatus = (status: number): boolean => {
  return status >= 200 && status < 300;
};

// Helper function to check if status code indicates client error
export const isClientError = (status: number): boolean => {
  return status >= 400 && status < 500;
};

// Helper function to check if status code indicates server error
export const isServerError = (status: number): boolean => {
  return status >= 500 && status < 600;
}; 