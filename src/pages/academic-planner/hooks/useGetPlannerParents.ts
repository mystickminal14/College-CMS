import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { PLANNEER_CACHE_KEY } from "../../../constants";
import { plannerGet } from "../services/PlannerService";
import type { Planners } from "../model/PlannerModel";

const useGetPlannerParents = () => {
  return useQuery<ApiResponse<Planners[]>, ApiErrorResponse>({
    queryKey: [PLANNEER_CACHE_KEY],
    queryFn: () => plannerGet.getAll(),
  });
};

export default useGetPlannerParents;
