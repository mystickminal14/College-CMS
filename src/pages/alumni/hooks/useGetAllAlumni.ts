import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { ALUMNI_CACHE_KEY, } from "../../../constants";
import alumniApi from "../services/AlumniService";
import type { Alumni } from "../model/AlumniModel";

interface AlumniQueryProps {
  search?: string;
  page?: number;
  limit?: number;
}

const useGetAlumni = ({ search = "", page = 1, limit = 10 }: AlumniQueryProps) => {
  return useQuery<ApiResponse<Alumni[]>, ApiErrorResponse>({
    queryKey: [ALUMNI_CACHE_KEY, search, page, limit],
    queryFn: () =>
      alumniApi.getAll(
        `?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAlumni;
