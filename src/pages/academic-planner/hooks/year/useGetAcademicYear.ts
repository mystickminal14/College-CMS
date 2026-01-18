import { academicYearApi } from "../../services/PlannerService";
import { PLANNER_YEAR } from "../../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { AcademicYear } from "../../model/PlannerModel";
import { useQuery } from "@tanstack/react-query";

const useGetAcademicYears = () => {
  return useQuery<ApiResponse<AcademicYear[]>, ApiErrorResponse>({
    queryKey: [PLANNER_YEAR],
    queryFn: () => academicYearApi.getAll(),
  });
};


export default useGetAcademicYears;
