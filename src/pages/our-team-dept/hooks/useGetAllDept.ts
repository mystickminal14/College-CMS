import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

import type { Dept } from "../model/DeptModel";
import DeptApi from "../services/DeptService";
import { DEPT_CACHE_KEY } from "../../../constants";
interface AlumniQueryProps {
  search?: string;
  page?: number;
  limit?: number;
}

const useGetAllDept = ({ search = "", page = 1, limit = 10 }: AlumniQueryProps) => {
  return useQuery<ApiResponse<Dept[]>, ApiErrorResponse>({
    queryKey: [DEPT_CACHE_KEY, search, page, limit],
    queryFn: () =>
      DeptApi.getAll(
        `?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAllDept;
