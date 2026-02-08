import { useQuery } from "@tanstack/react-query";
import DeptApi from "../services/DeptService";
import type { Dept } from "../model/DeptModel";
import { DEPT_NAME_CACHE_KEY } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

const useGetDeptNameAll = () => {
  return useQuery<ApiResponse<Dept[]>, ApiErrorResponse>({
    queryKey: [DEPT_NAME_CACHE_KEY],
    queryFn: () => DeptApi.getAll('name'),
  });
};

export default useGetDeptNameAll;
