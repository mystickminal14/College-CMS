import axios, { AxiosError } from "axios";
import { PCPS_BASE_URL } from "../constants";
import type { ApiErrorResponse } from "./apiTypes";

/**
 * Dedicated client for the PHP (edusysapi) backend.
 *
 * The PHP front controller only dispatches to the API when the Accept header is
 * exactly "application/json", so we set that on the instance. We deliberately do
 * NOT set a global Content-Type: axios picks "application/json" for plain object
 * bodies and the correct multipart boundary for FormData uploads.
 */
const pcpsAxios = axios.create({
  baseURL: PCPS_BASE_URL,
  headers: { Accept: "application/json" },
  withCredentials: true,
  timeout: 30000,
});

pcpsAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
});

// Map PHP error bodies ({ message: "..." }) into the app's ApiErrorResponse shape.
pcpsAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const backend = error.response?.data as Partial<ApiErrorResponse> | undefined;
    const parsed: ApiErrorResponse = {
      statusCode: backend?.statusCode || error.response?.status || 500,
      message: backend?.message || error.message,
      success: false,
      data: null,
      errors: backend?.errors || [],
    };
    return Promise.reject(parsed);
  }
);

// PHP create endpoints respond with { message, id }.
export interface PcpsCreateResponse {
  message?: string;
  id?: number;
}

// PHP upload endpoints respond with { message, type, filename, url, id, attached }.
export interface PcpsUploadResponse {
  message?: string;
  type?: "poster" | "resume";
  filename?: string;
  url?: string;
  id?: number | null;
  attached?: boolean;
}

export type UploadKind = "poster" | "resume";

/**
 * POST /upload/poster | /upload/resume  (multipart/form-data, file field name: "file").
 * Pass recordId to have the URL written straight onto the matching record's column.
 */
export const uploadToPcps = async (
  kind: UploadKind,
  file: File,
  recordId?: number | string | null
): Promise<PcpsUploadResponse> => {
  const fd = new FormData();
  fd.append("file", file);
  if (recordId !== undefined && recordId !== null && `${recordId}` !== "") {
    fd.append("id", String(recordId));
  }
  const res = await pcpsAxios.post<PcpsUploadResponse>(`/upload/${kind}`, fd);
  return res.data;
};

export default pcpsAxios;
