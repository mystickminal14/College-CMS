import { useQuery } from "@tanstack/react-query";

import { FEE_PLANNEER_CACHE_KEY } from "../../../constants";
import type { FeePlanner } from "../model/PlannerModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import plannerApi from "../services/PlannerService";

interface PaginationParams {
  page: number;
  limit: number;
}

const useGetFeePlannersPagination = ({ page, limit }: PaginationParams) => {
 const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));  return useQuery<ApiResponse<FeePlanner[]>, ApiErrorResponse>({
    queryKey: [FEE_PLANNEER_CACHE_KEY, page, limit],
    queryFn: () => plannerApi.getAll(`?${params.toString()}`),
  });
};

export default useGetFeePlannersPagination;
