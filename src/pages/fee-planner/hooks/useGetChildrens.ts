// hooks/useGetChildren.ts
import { useQuery } from "@tanstack/react-query";
import type { Planners } from "../model/PlannerModel";
import { plannerChildrenApi } from "../services/PlannerService";
import { FEE_PLANNEER_CACHE_KEY, FEE_PLANNEER_CHILD_CACHE_KEY } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

const useGetChildren = (parentId: number) => {
   return useQuery<ApiResponse<Planners[]>, ApiErrorResponse>({
      queryKey: [FEE_PLANNEER_CACHE_KEY,parentId,FEE_PLANNEER_CHILD_CACHE_KEY],
      queryFn: () => plannerChildrenApi.getAll(parentId),
    });
};

export default useGetChildren;
