import { useQuery } from "@tanstack/react-query";

import { ALL_FEE_PLANNEER_CACHE_KEY } from "../../../constants";
import type { FeePlanner } from "../model/PlannerModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import plannerApi from "../services/PlannerService";



const useGetFeePlanners = () => {
  return useQuery<ApiResponse<FeePlanner[]>, ApiErrorResponse>({
    queryKey: [ALL_FEE_PLANNEER_CACHE_KEY,],
    queryFn: () => plannerApi.getAll(),
  });
};

export default useGetFeePlanners;
