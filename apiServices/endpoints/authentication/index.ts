import { getRequest, patchRequest, postRequest } from "../../methods";

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

// Type definitions for authentication requests
export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface VerifyOTPRequest {
  phone?: string;
  email?: string;
  otp: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface AppleLoginRequest {
  identityToken: string;
  user?: {
    name?: {
      firstName: string;
      lastName: string;
    };
    email?: string;
  };
}

// Authentication API functions
export const authAPI = {
  /**
   * Login with email/phone and password
   */
  login: async (data: LoginRequest) => {
    return postRequest<{
      user: any;
      token: string;
      refreshToken: string;
    }>({
      endpoint: AUTH_ENDPOINTS.LOGIN,
      body: data,
    });
  },

  /**
   * Sign up new user
   */
  signup: async (data: SignupRequest) => {
    return postRequest<{
      user: any;
      token: string;
      message: string;
    }>({
      endpoint: AUTH_ENDPOINTS.SIGNUP,
      body: data,
    });
  },

  /**
   * Verify OTP for phone/email verification
   */
  verifyOTP: async (data: VerifyOTPRequest) => {
    return postRequest<{
      user: any;
      token: string;
      message: string;
    }>({
      endpoint: AUTH_ENDPOINTS.VERIFY_OTP,
      body: data,
    });
  },

  /**
   * Resend OTP
   */
  resendOTP: async (identifier: { phone?: string; email?: string }) => {
    return postRequest<{ message: string }>({
      endpoint: AUTH_ENDPOINTS.RESEND_OTP,
      body: identifier,
    });
  },

  /**
   * Google Sign In
   */
  googleLogin: async (data: GoogleLoginRequest) => {
    return postRequest<{
      user: any;
      token: string;
      refreshToken: string;
    }>({
      endpoint: AUTH_ENDPOINTS.GOOGLE_LOGIN,
      body: data,
    });
  },

  /**
   * Apple Sign In
   */
  appleLogin: async (data: AppleLoginRequest) => {
    return postRequest<{
      user: any;
      token: string;
      refreshToken: string;
    }>({
      endpoint: AUTH_ENDPOINTS.APPLE_LOGIN,
      body: data,
    });
  },

  /**
   * Get user profile
   */
  getProfile: async () => {
    return getRequest<{ user: any }>({
      endpoint: AUTH_ENDPOINTS.PROFILE,
    });
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<any>) => {
    return patchRequest<{
      user: any;
      message: string;
    }>({
      endpoint: AUTH_ENDPOINTS.UPDATE_PROFILE,
      body: data,
    });
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string) => {
    return postRequest<{
      token: string;
      refreshToken: string;
    }>({
      endpoint: AUTH_ENDPOINTS.REFRESH_TOKEN,
      body: { refreshToken },
    });
  },

  /**
   * Logout user
   */
  logout: async () => {
    return postRequest<{ message: string }>({
      endpoint: AUTH_ENDPOINTS.LOGOUT,
      body: {},
    });
  },
}; 