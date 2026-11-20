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
  /** Matched against the stored purpose text, not an id. */
  purpose?: string;
  /** Inclusive Nepal calendar days, YYYY-MM-DD; either end may be blank. */
  from?: string;
  to?: string;
}

const useGetVisitors = ({
  search = "",
  page = 1,
  limit = 10,
  status = "",
  purpose = "",
  from = "",
  to = "",
}: VisitorQueryProps) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (purpose) params.append("purpose", purpose);
  if (from) params.append("from", from);
  if (to) params.append("to", to);
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<Visitor[]>, ApiErrorResponse>({
    queryKey: [VISITOR_CACHE_KEY, search, page, limit, status, purpose, from, to],
    queryFn: () => VisitorApi.getAll(`?${params.toString()}`),
  });
};

export default useGetVisitors;
