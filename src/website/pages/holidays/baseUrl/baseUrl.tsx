import axios, { type AxiosRequestConfig } from "axios";
import { PCPS_BASE_URL } from "../../../../constants";

// Create instance
const axiosInstance = axios.create({
  baseURL: PCPS_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout:5000
});


class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (params?: any,config?: AxiosRequestConfig) => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.get<T[]>(url, config);
    return response.data;
  };
 

}

export default APIClient;
