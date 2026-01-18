import { useQuery } from "@tanstack/react-query";
import { getAlumni } from "../services/alumniServices";
import { ALUMNI_FORM_CACHE_KEY } from "../../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { AlumniFormData } from "../models/alumniModel";

interface AlumniQueryProps {
  search?: string;
  page?: number;
  limit?: number;
  status?: "ENABLED" | "DISABLED" | ""; // ✅ add status
}

const useGetAlumni = ({
  search = "",
  page = 1,
  limit = 10,
  status = "",
}: AlumniQueryProps) => {
  return useQuery<ApiResponse<AlumniFormData[]>, ApiErrorResponse>({
    queryKey: [ALUMNI_FORM_CACHE_KEY, search, page, limit, status],
    queryFn: () =>
      getAlumni.getAll(
        `?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}${
          status ? `&status=${status}` : ""
        }`
      ),
  });
};

export default useGetAlumni;
