import { instance } from '../../instance';

// Authentication endpoint paths
const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  VERIFY_OTP: "/auth/verify-otp",
  RESEND_OTP: "/auth/resend-otp",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  REFRESH_TOKEN: "/auth/refresh-token",
  LOGOUT: "/auth/logout",
  PROFILE: "/auth/profile",
  UPDATE_PROFILE: "/auth/update-profile",
  GOOGLE_LOGIN: "/auth/google",
  APPLE_LOGIN: "/auth/apple",
} as const;

// Request/Response Type Definitions
export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface OTPVerificationRequest {
  email?: string;
  phone?: string;
  otp: string;
}

export interface ResendOTPRequest {
  email?: string;
  phone?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

// API Functions
export const authAPI = {
  // Login with email or phone
  login: async (data: LoginRequest) => {
    return await instance.post('/auth/login', data);
  },

  // User registration
  signup: async (data: SignupRequest) => {
    return await instance.post('/auth/signup', data);
  },

  // OTP verification
  verifyOTP: async (data: OTPVerificationRequest) => {
    return await instance.post('/auth/verify-otp', data);
  },

  // Resend OTP
  resendOTP: async (data: ResendOTPRequest) => {
    return await instance.post('/auth/resend-otp', data);
  },

  // Get user profile
  getProfile: async () => {
    return await instance.get('/auth/profile');
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileRequest) => {
    return await instance.put('/auth/profile', data);
  },

  // Refresh authentication token
  refreshToken: async (data: RefreshTokenRequest) => {
    return await instance.post('/auth/refresh-token', data);
  },

  // Logout
  logout: async () => {
    return await instance.post('/auth/logout');
  },
}; 