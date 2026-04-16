import axios, { type AxiosRequestConfig } from "axios";
import { PCPS_BASE_URL } from "../../../../constants";
import type { ApiResponse } from "../../../../services/apiTypes";

// Create instance
const axiosInstance = axios.create({
  baseURL: PCPS_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000
});


class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (params?: any, config?: AxiosRequestConfig) => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.get<T[]>(url, config);
    return response.data;
  };
  post = async (
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.post<ApiResponse<T>>(
      this.endpoint,
      data,
      config
    );
    return response.data;
  };


}

export default APIClient;
