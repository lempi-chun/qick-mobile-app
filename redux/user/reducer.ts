import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  _id?: string;
  email?: string;
  name?: string;
  phone?: string;
  avatar?: string;
  isVerified?: boolean;
  role?: string;
  skills?: any;
  stats?: any;
  preferences?: any;
  token?: string;
}

interface UserState {
  userData: UserData | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ userData: UserData; token: string; refreshToken?: string }>) => {
      state.isLoading = false;
      state.userData = { ...action.payload.userData, token: action.payload.token };
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || null;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.userData = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    updateUserData: (state, action: PayloadAction<Partial<UserData>>) => {
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
  logout,
  updateUserData,
  clearError,
  setLoading,
} = userSlice.actions;

export const userReducer = userSlice.reducer; 