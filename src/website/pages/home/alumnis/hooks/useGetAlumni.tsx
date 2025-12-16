import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../../services/apiTypes";
import { ALUMNI_CACHE_KEY } from "../../../../../constants";
import type { Alumni } from "../../../../../pages/alumni/model/AlumniModel";
import { alumniAllApi } from "../../../../../pages/alumni/services/AlumniService";



const useGetAll = () => {
  return useQuery<ApiResponse<Alumni[]>, ApiErrorResponse>({
    queryKey: [ALUMNI_CACHE_KEY],
    queryFn: () =>
      alumniAllApi.getAll(),
  });
};

export default useGetAll;
