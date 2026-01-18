import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { FeeYear } from "../../model/PlannerModel";
import { feeYearPaginationApi } from "../../services/PlannerService";
import {  FEEPLANNER_YEAR_PAG } from "../../../../constants";


interface PaginationParams {
  page: number;
  limit: number;
}


const useGetFeeYearsPagination = ({ page, limit }: PaginationParams) => {
 const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));  return useQuery<ApiResponse<FeeYear[]>, ApiErrorResponse>({
    queryKey: [FEEPLANNER_YEAR_PAG, page, limit],
    queryFn: () => feeYearPaginationApi.getAll(`?${params.toString()}`),
  });
};
export default useGetFeeYearsPagination;
