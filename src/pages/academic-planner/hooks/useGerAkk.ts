import { useQuery } from "@tanstack/react-query";

import { PLANNEER_CACHE_KEY } from "../../../constants";
import type { AcademicPlanner } from "../model/PlannerModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import plannerApi from "../services/PlannerService";

interface PaginationParams {
  page: number;
  limit: number;
}

const useGetAcademicPlannersPagination = ({ page, limit }: PaginationParams) => {
 const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));  return useQuery<ApiResponse<AcademicPlanner[]>, ApiErrorResponse>({
    queryKey: [PLANNEER_CACHE_KEY, page, limit],
    queryFn: () => plannerApi.getAll(`?${params.toString()}`),
  });
};

export default useGetAcademicPlannersPagination;
