import { instance, instanceFormData } from "../instance";
import { requestHandler } from "../requestHandler";
import { target } from "../target";
import {
    DeleteRequestParams,
    GetRequestParams,
    PostRequestParams,
    PutRequestParams
} from "./types";

/**
 * Centralized GET request handler
 */
export const getRequest = async <T>({
  endpoint,
  params,
  config
}: GetRequestParams): Promise<T> => {
  return requestHandler(() =>
    instance.get<T>(`${target}${endpoint}`, { params, ...config })
  );
};

/**
 * Centralized POST request handler
 */
export const postRequest = async <T>({
  endpoint,
  body,
  config
}: PostRequestParams): Promise<T> => {
  const apiInstance = body instanceof FormData ? instanceFormData : instance;
  
  return requestHandler(() =>
    apiInstance.post<T>(`${target}${endpoint}`, body, { ...config })
  );
};

/**
 * Centralized PUT request handler
 */
export const putRequest = async <T>({
  endpoint,
  body,
  config
}: PutRequestParams): Promise<T> => {
  const apiInstance = body instanceof FormData ? instanceFormData : instance;
  
  return requestHandler(() =>
    apiInstance.put<T>(`${target}${endpoint}`, body, { ...config })
  );
};

/**
 * Centralized PATCH request handler
 */
export const patchRequest = async <T>({
  endpoint,
  body,
  config
}: PostRequestParams): Promise<T> => {
  const apiInstance = body instanceof FormData ? instanceFormData : instance;
  
  return requestHandler(() =>
    apiInstance.patch<T>(`${target}${endpoint}`, body, { ...config })
  );
};

/**
 * Centralized DELETE request handler
 */
export const deleteRequest = async <T>({
  endpoint,
  config
}: DeleteRequestParams): Promise<T> => {
  return requestHandler(() =>
    instance.delete<T>(`${target}${endpoint}`, { ...config })
  );
}; 