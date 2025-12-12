import type { AxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants";
import type { ApiErrorResponse, ApiResponse } from "./apiTypes";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Convert backend errors → ApiErrorResponse
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const backend = error.response?.data as ApiErrorResponse;

    const parsed: ApiErrorResponse = {
      statusCode: backend?.statusCode || 500,
      message: backend?.message || error.message,
      success: false,
      data: null,
      errors: backend?.errors || [],
    };

    return Promise.reject(parsed);
  }
);


class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T[]>> => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.get<ApiResponse<T[]>>(url, config);
    return response.data;
  };

  get = async (
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  };

  post = async (
    data: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.post<ApiResponse<T>>(
      this.endpoint,
      data,
      config
    );
    return response.data;
  };

  delete = async (
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.delete<ApiResponse<T>>(url, config);
    return response.data;
  };

  put = async (
    data: any,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.put<ApiResponse<T>>(
      url,
      data,
      config
    );
    
    return response.data;
  };
  postImage = async (
    formData: FormData,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;

    const res = await axiosInstance.put<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  };
}

export default APIClient;
