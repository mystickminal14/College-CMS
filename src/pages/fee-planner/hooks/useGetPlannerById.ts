import { useQuery } from "@tanstack/react-query";
import { FEE_PLANNEER_CACHE_KEY } from "../../../constants";
import plannerApi from "../services/PlannerService";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import type { Planners } from "../model/PlannerModel";

const useGetParentWithChildren = () => {
  return useQuery<ApiResponse<Planners[]>, ApiErrorResponse>({
    queryKey: [FEE_PLANNEER_CACHE_KEY],
    queryFn: () => plannerApi.getAll(), 
  });
};

export default useGetParentWithChildren;
