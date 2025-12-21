import { useQuery } from "@tanstack/react-query";
import type { Achivement } from "../model/AchivementModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { ACHIVEMENT_CACHE_KEY } from "../../../constants";
import achivementApi from "../services/AchivementService";

const useGetAchivementsAll = () => {
  return useQuery<ApiResponse<Achivement[]>, ApiErrorResponse>({
    queryKey: [ACHIVEMENT_CACHE_KEY],
    queryFn: () => achivementApi.getAll(),
  });
};

export default useGetAchivementsAll;
