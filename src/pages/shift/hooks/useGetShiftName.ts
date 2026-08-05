import { useQuery } from "@tanstack/react-query";
import ShiftApi from "../services/ShiftService";
import type { Shift } from "../model/ShiftModel";
import { SHIFT_NAME_CACHE_KEY } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

const useGetShiftNameAll = () => {
  return useQuery<ApiResponse<Shift[]>, ApiErrorResponse>({
    queryKey: [SHIFT_NAME_CACHE_KEY],
    queryFn: () => ShiftApi.getAll("all"),
  });
};

export default useGetShiftNameAll;
