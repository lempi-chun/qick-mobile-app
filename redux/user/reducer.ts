import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  isVerified: boolean;
  token?: string;
}

interface UserState {
  isAuthenticated: boolean;
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userData: null,
  isLoading: false,
  error: null,
  token: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{
      userData: UserData;
      token: string;
      refreshToken: string;
    }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.userData = null;
      state.token = null;
      state.refreshToken = null;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<{
      userData: UserData;
      token: string;
      refreshToken: string;
    }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.userData = null;
      state.token = null;
      state.refreshToken = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      state.isLoading = false;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  updateProfile,
  clearError,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer; 