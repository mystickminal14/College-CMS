import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import type { ScholarshipSchedule } from "../model";
import scholarshipApi from "../scholar-service";

export const SCHOLARSHIP_CACHE_KEY = "SCHOLARSHIP_SCHEDULE";

const useGetScholarship = () => {
  return useQuery<ApiResponse<ScholarshipSchedule>, ApiErrorResponse>({
    queryKey: [SCHOLARSHIP_CACHE_KEY],
    queryFn: () => scholarshipApi.get(), 
  });
};

export default useGetScholarship;
