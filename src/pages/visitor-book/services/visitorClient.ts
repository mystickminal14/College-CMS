import axios, { AxiosError, type AxiosRequestConfig } from "axios";

import { VISITOR_BASE_URL } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

/* ---------------------------------------------------------------------------
   The visitor register is served by the PHP edusys API, which does not use the
   `{ statusCode, data, message, success }` envelope the Node server wrapped
   every reply in. It answers with whatever the route happens to return:

     GET  /visitor            -> { data: [...], pagination: {...} }
     GET  /visitor/today      -> { date, visitors, total, checkedIn, checkedOut }
     GET  /visitor/pass/{tok} -> { code, name, purpose, ... }          (bare row)
     POST /visitor            -> { message, id, qrToken, data }
     POST /visitor/kiosk/register -> { message, qrToken }
     DELETE /visitor/{id}     -> { message }

   So rather than sprinkle shape checks through the hooks, this client puts the
   envelope back on: a body carrying a `data` key is unwrapped, anything else
   *is* the data. Everything downstream keeps reading ApiResponse<T>.
--------------------------------------------------------------------------- */

const axiosInstance = axios.create({
  baseURL: VISITOR_BASE_URL,
  headers: {
    // index.php only hands the request to Routes/api.php when Accept is
    // exactly "application/json" — anything else gets the HTML landing page.
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeErrors = (errors: unknown) =>
  Array.isArray(errors)
    ? // PHP reports validation failures as plain strings; the UI reads
      // errors[0].message, so wrap them.
      errors.map((e: unknown) => (typeof e === "string" ? { message: e } : e))
    : [];

/**
 * PHP does not always answer with JSON — a driver or parse failure is echoed as
 * bare text, sometimes under a 200 — so a string body is treated as the message
 * rather than thrown away in favour of "Request failed with status code 500".
 */
const toApiError = (
  status: number,
  body: unknown,
  fallbackMessage: string,
): ApiErrorResponse => {
  const fromBody = isPlainObject(body)
    ? typeof body.message === "string"
      ? body.message
      : ""
    : typeof body === "string"
      ? body.trim().slice(0, 300)
      : "";

  return {
    statusCode: status,
    message: fromBody || fallbackMessage,
    success: false,
    data: null,
    errors: isPlainObject(body) ? normalizeErrors(body.errors) : [],
  };
};

axiosInstance.interceptors.response.use(
  (response) => {
    // A PHP notice or an uncaught driver message is echoed as bare text with a
    // 200, which would otherwise sail through as a "successful" string payload.
    if (typeof response.data === "string") {
      return Promise.reject(toApiError(502, response.data, "Unexpected server response."));
    }
    return response;
  },
  (error: AxiosError) =>
    Promise.reject(toApiError(error.response?.status ?? 500, error.response?.data, error.message)),
);

const unwrap = <T,>(body: unknown, status: number): ApiResponse<T> => {
  const envelope = isPlainObject(body);
  const data = envelope && "data" in body ? body.data : body;

  return {
    statusCode: status,
    data: (data ?? null) as T | null,
    message: envelope && typeof body.message === "string" ? body.message : "",
    success: status < 400,
    pagination: envelope ? (body.pagination as ApiResponse<T>["pagination"]) : undefined,
  };
};

/**
 * Same call surface as the shared `APIClient`, minus the methods the visitor
 * routes have no use for. `put`/`post` take the path suffix so callers can hit
 * the PHP sub-resources (`/visitor/{id}/checkout`, `/visitor/photo/{token}`)
 * without building a fresh client per request.
 */
class VisitorApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private url = (params?: string | number) => {
    if (params === undefined || params === null || params === "") return this.endpoint;
    // A query string hangs straight off the endpoint; anything else is a path
    // segment. The PHP router reads path segments positionally, so a stray
    // slash before "?" would shift `$param` and hit the wrong branch.
    const suffix = String(params);
    return suffix.startsWith("?") ? `${this.endpoint}${suffix}` : `${this.endpoint}/${suffix}`;
  };

  getAll = async (params?: string, config?: AxiosRequestConfig): Promise<ApiResponse<T[]>> => {
    const res = await axiosInstance.get(this.url(params), config);
    return unwrap<T[]>(res.data, res.status);
  };

  get = async (params?: string | number, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const res = await axiosInstance.get(this.url(params), config);
    return unwrap<T>(res.data, res.status);
  };

  post = async (
    data?: unknown,
    params?: string | number,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const res = await axiosInstance.post(this.url(params), data, config);
    return unwrap<T>(res.data, res.status);
  };

  put = async (
    data?: unknown,
    params?: string | number,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const res = await axiosInstance.put(this.url(params), data, config);
    return unwrap<T>(res.data, res.status);
  };

  delete = async (
    params?: string | number,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const res = await axiosInstance.delete(this.url(params), config);
    return unwrap<T>(res.data, res.status);
  };

  /**
   * Uploads go out as POST even where the route reads like a replacement: PHP
   * only fills $_FILES on POST, so a PUT arrives with an empty file array.
   */
  postFile = async (
    formData: FormData,
    params?: string | number,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const res = await axiosInstance.post(this.url(params), formData, {
      ...config,
      headers: { ...config?.headers, "Content-Type": "multipart/form-data" },
    });
    return unwrap<T>(res.data, res.status);
  };
}

export default VisitorApiClient;
