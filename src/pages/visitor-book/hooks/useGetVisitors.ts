import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { EVisitorStatus, Visitor } from "../model/VisitorModel";
import VisitorApi from "../services/VisitorService";
import { VISITOR_CACHE_KEY } from "../../../constants";

interface VisitorQueryProps {
  search?: string;
  page?: number;
  limit?: number;
  status?: EVisitorStatus | "";
  purposeId?: number | "";
  date?: string;
}

const useGetVisitors = ({
  search = "",
  page = 1,
  limit = 10,
  status = "",
  purposeId = "",
  date = "",
}: VisitorQueryProps) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (purposeId) params.append("purposeId", String(purposeId));
  if (date) params.append("date", date);
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<Visitor[]>, ApiErrorResponse>({
    queryKey: [VISITOR_CACHE_KEY, search, page, limit, status, purposeId, date],
    queryFn: () => VisitorApi.getAll(`?${params.toString()}`),
  });
};

export default useGetVisitors;
