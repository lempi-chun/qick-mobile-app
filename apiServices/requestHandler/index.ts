import { AxiosResponse } from "axios";

/**
 * Central request handler that processes all API requests
 * @param request - Function that returns a Promise of AxiosResponse
 * @returns The response data of type T
 */
export const requestHandler = async <T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    // Error is already handled by the axios interceptor and handleError function
    // We just need to re-throw it for the calling code to handle if needed
    throw error;
  }
}; 