import { useQuery } from "@tanstack/react-query";
import ClassTimingApi from "../services/ClassTimingService";
import type { ClassTiming } from "../model/ClassTimingModel";
import { CLASS_TIMING_NAME_CACHE_KEY } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

const useGetClassTimingNameAll = () => {
  return useQuery<ApiResponse<ClassTiming[]>, ApiErrorResponse>({
    queryKey: [CLASS_TIMING_NAME_CACHE_KEY],
    queryFn: () => ClassTimingApi.getAll("all"),
  });
};

export default useGetClassTimingNameAll;
