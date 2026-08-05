import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

import type { Shift } from "../model/ShiftModel";
import ShiftApi from "../services/ShiftService";
import { SHIFT_CACHE_KEY } from "../../../constants";

interface ShiftQueryProps {
  search?: string;
  page?: number;
  status?: "ENABLED" | "DISABLED" | "";
  limit?: number;
}

const useGetAllShift = ({ search = "", status = "", page = 1, limit = 10 }: ShiftQueryProps) => {
  return useQuery<ApiResponse<Shift[]>, ApiErrorResponse>({
    queryKey: [SHIFT_CACHE_KEY, search, status, page, limit],
    queryFn: () =>
      ShiftApi.getAll(
        `?search=${encodeURIComponent(search)}&status=${status}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAllShift;
