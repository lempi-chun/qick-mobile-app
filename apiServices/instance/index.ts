import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Constants from 'expo-constants';
import { store } from "../../redux/store";
import { handleError } from "../errorHandling";

const baseUrl = Constants.expoConfig?.extra?.baseURL;

export const BASE_URL = `${baseUrl}/` || "https://qick-backend-staging.onrender.com/";

// Create a function to configure an Axios instance
const createInstance = (config: AxiosRequestConfig = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 30 seconds timeout
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    ...config,
  });

  // Request Interceptor
  instance.interceptors.request.use(
    (request) => {
      const { token } = store.getState().userReducer?.userData || {};

      // Add token to headers if available
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (__DEV__) {
        console.log("🚀 API Request:", {
          method: request.method?.toUpperCase(),
          url: request.url,
          baseURL: request.baseURL,
          headers: request.headers,
        });
      }

      return request;
    },
    (error) => {
      console.error("❌ Request Error:", error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => {
      // Log successful responses in development
      if (__DEV__) {
        console.log("✅ API Response:", {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }
      return response;
    },
    (error) => {
      // Log error responses
      console.error("❌ API Error Response:", {
        status: error.response?.status,
        url: error.config?.url,
        message: error.response?.data?.message || error.message,
      });

      // Handle token expiration
      if (error.response?.status === 401 || error.response?.status === 498) {
        // Token expired, logout user
        store.dispatch({ type: 'user/logout' });
      }

      // Handle global errors
      handleError(error);
      return Promise.reject(error);
    }
  );

  return instance;
};

// Export instances for different content types
export const instance = createInstance();

export const instanceFormData = createInstance({
  headers: { 
    "Content-Type": "multipart/form-data",
  },
});

export const instanceJSON = createInstance({
  headers: { 
    "Content-Type": "application/json",
  },
}); 