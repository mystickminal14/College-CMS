import { useQuery } from "@tanstack/react-query";

import { ALL_PLANNEER_CACHE_KEY } from "../../../constants";
import type { AcademicPlanner } from "../model/PlannerModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import plannerApi from "../services/PlannerService";



const useGetAcademicPlanners = () => {
  return useQuery<ApiResponse<AcademicPlanner[]>, ApiErrorResponse>({
    queryKey: [ALL_PLANNEER_CACHE_KEY,],
    queryFn: () => plannerApi.getAll(),
  });
};

export default useGetAcademicPlanners;
