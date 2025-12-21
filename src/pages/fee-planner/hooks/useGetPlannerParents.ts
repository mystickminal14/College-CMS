import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { FEE_PLANNEER_CACHE_KEY } from "../../../constants";
import { plannerApiAll,  } from "../services/PlannerService";
import type { Planners } from "../model/PlannerModel";

const useGetPlannerParents = () => {
  return useQuery<ApiResponse<Planners[]>, ApiErrorResponse>({
    queryKey: [FEE_PLANNEER_CACHE_KEY],
    queryFn: () => plannerApiAll.getAll(),
  });
};

export default useGetPlannerParents;
