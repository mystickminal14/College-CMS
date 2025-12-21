import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {CONNECT_CACHE_KEY } from "../../../constants";
import ConnectsApi from "../services/ConnectService";
import type { Connects } from "../model/Connects";

interface ConnectsQueryProps {
  page?: number;
  limit?: number;
}

const useGetConnects = ({ page = 1,limit = 10 }: ConnectsQueryProps) => {
  return useQuery<ApiResponse<Connects[]>, ApiErrorResponse>({
    queryKey: [CONNECT_CACHE_KEY, page, limit],
    queryFn: () =>
      ConnectsApi.getAll(
        `?page=${page}&limit=${limit}`
      ),
  });
};

export default useGetConnects;
