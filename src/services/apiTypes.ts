export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T | null;
  message: string;
  success: boolean;
  pagination?: Pagination;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  success: false;
  data: null;
  errors?: any[];
}
