import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { ALUMNI_CACHE_KEY } from "../../../../constants";
import { getAlumni } from "../services/alumniServices";
import type { AlumniFormData } from "../models/alumniModel";

const useGetAlumni = () => {
  return useQuery<ApiResponse<AlumniFormData[]>, ApiErrorResponse>({
    queryKey: [ALUMNI_CACHE_KEY],
    queryFn: () => getAlumni.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useGetAlumni;
