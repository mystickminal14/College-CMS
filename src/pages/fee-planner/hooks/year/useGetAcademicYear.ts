import { feeYearApi } from "../../services/PlannerService";
import { PLANNER_YEAR } from "../../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { FeeYear } from "../../model/PlannerModel";
import { useQuery } from "@tanstack/react-query";

const useGetFeeYears = () => {
  return useQuery<ApiResponse<FeeYear[]>, ApiErrorResponse>({
    queryKey: [PLANNER_YEAR],
    queryFn: () => feeYearApi.getAll(),
  });
};


export default useGetFeeYears;
