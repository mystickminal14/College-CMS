// hooks/useGetParentWithChildren.ts
import { useQuery } from "@tanstack/react-query";
import { PLANNEER_CACHE_KEY, PLANNEER_CHILD_CACHE_KEY } from "../../../constants";
import plannerApi from "../services/PlannerService";

const useGetParentWithChildren = (id: number) => {
  return useQuery({
    queryKey: [PLANNEER_CHILD_CACHE_KEY,id,PLANNEER_CACHE_KEY],
    queryFn: () => plannerApi.get(id),
    enabled: !!id,
  });
};

export default useGetParentWithChildren;
