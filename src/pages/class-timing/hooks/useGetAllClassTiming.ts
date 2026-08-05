import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

import type { ClassTiming } from "../model/ClassTimingModel";
import ClassTimingApi from "../services/ClassTimingService";
import { CLASS_TIMING_CACHE_KEY } from "../../../constants";

interface ClassTimingQueryProps {
  search?: string;
  page?: number;
  status?: "ENABLED" | "DISABLED" | "";
  limit?: number;
}

const useGetAllClassTiming = ({
  search = "",
  status = "",
  page = 1,
  limit = 10,
}: ClassTimingQueryProps) => {
  return useQuery<ApiResponse<ClassTiming[]>, ApiErrorResponse>({
    queryKey: [CLASS_TIMING_CACHE_KEY, search, status, page, limit],
    queryFn: () =>
      ClassTimingApi.getAll(
        `?search=${encodeURIComponent(search)}&status=${status}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAllClassTiming;
