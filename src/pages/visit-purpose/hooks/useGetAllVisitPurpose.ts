import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

import type { VisitPurpose } from "../model/VisitPurposeModel";
import VisitPurposeApi from "../services/VisitPurposeService";
import { VISIT_PURPOSE_CACHE_KEY } from "../../../constants";

interface VisitPurposeQueryProps {
  search?: string;
  page?: number;
  status?: "ENABLED" | "DISABLED" | "";
  limit?: number;
}

const useGetAllVisitPurpose = ({
  search = "",
  status = "",
  page = 1,
  limit = 10,
}: VisitPurposeQueryProps) => {
  return useQuery<ApiResponse<VisitPurpose[]>, ApiErrorResponse>({
    queryKey: [VISIT_PURPOSE_CACHE_KEY, search, status, page, limit],
    queryFn: () =>
      VisitPurposeApi.getAll(
        `?search=${encodeURIComponent(search)}&status=${status}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAllVisitPurpose;
