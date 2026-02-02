import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { SCHOLARSHIP_CACHE_KEY } from "./useGet";
import scholarshipApi from "../scholar-service";
import type { ScholarshipSchedule } from "../model";



const useGetAllScholar = () => {

  return useQuery<ApiResponse<ScholarshipSchedule[]>, ApiErrorResponse>({
    queryKey: [SCHOLARSHIP_CACHE_KEY,],
    queryFn: () => scholarshipApi.getAll('all'),
  });
};


export default useGetAllScholar;
