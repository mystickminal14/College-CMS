import { useQuery } from "@tanstack/react-query";
import type { Achivement } from "../model/AchivementModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { ACHIVEMENT_CACHE_KEY } from "../../../constants";
import achivementApi from "../services/AchivementService";

interface AchivementsQueryProps {
  page?: number;
  limit?: number;
}

const useGetAchivements = ({  page = 1, limit = 10 }: AchivementsQueryProps) => {
  return useQuery<ApiResponse<Achivement[]>, ApiErrorResponse>({
    queryKey: [ACHIVEMENT_CACHE_KEY, page, limit],
    queryFn: () =>
      achivementApi.getAll(
        `get?page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAchivements;
