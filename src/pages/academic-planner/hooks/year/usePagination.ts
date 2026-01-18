import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { AcademicYear } from "../../model/PlannerModel";
import { academicYearPaginationApi } from "../../services/PlannerService";
import {  PLANNER_YEAR_PAG } from "../../../../constants";


interface PaginationParams {
  page: number;
  limit: number;
}


const useGetAcademicYearsPagination = ({ page, limit }: PaginationParams) => {
 const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));  return useQuery<ApiResponse<AcademicYear[]>, ApiErrorResponse>({
    queryKey: [PLANNER_YEAR_PAG, page, limit],
    queryFn: () => academicYearPaginationApi.getAll(`?${params.toString()}`),
  });
};
export default useGetAcademicYearsPagination;
