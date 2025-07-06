import { AxiosRequestConfig } from "axios";

/**
 * Parameters for POST request
 * @param endpoint - API endpoint (e.g., "/users")
 * @param body - Request body (optional)
 * @param config - Additional Axios configuration (optional)
 */
export interface PostRequestParams {
    endpoint: string;
    body?: any;
    config?: AxiosRequestConfig;
}

/**
 * Parameters for GET request
 * @param endpoint - API endpoint (e.g., "/users")
 * @param params - Query parameters as key-value pairs (optional)
 * @param config - Additional Axios configuration (optional)
 */
export interface GetRequestParams {
    endpoint: string;
    params?: Record<string, unknown>;
    config?: AxiosRequestConfig;
}

/**
 * Parameters for PUT request
 * @param endpoint - API endpoint (e.g., "/users/123")
 * @param body - Request body (optional)
 * @param config - Additional Axios configuration (optional)
 */
export interface PutRequestParams {
    endpoint: string;
    body?: any;
    config?: AxiosRequestConfig;
}

/**
 * Parameters for DELETE request
 * @param endpoint - API endpoint (e.g., "/users/123")
 * @param config - Additional Axios configuration (optional)
 */
export interface DeleteRequestParams {
    endpoint: string;
    config?: AxiosRequestConfig;
} 