import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NOTICE_CACHE_KEY } from "../../../constants";
import NoticesApi from "../services/NoticeService";
import type { Notices } from "../model/NoticeModel";
import { useQuery } from "@tanstack/react-query";

interface NoticesQueryProps {
  /** NoticeType id — the API also accepts a slug or name for old links. */
  typeId?: number | "";
  page?: number;
  limit?: number;
}

const useGetNotices = ({ typeId = "", page = 1, limit = 10 }: NoticesQueryProps) => {
  const params = new URLSearchParams();

  if (typeId) params.append("type", String(typeId));
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<Notices[]>, ApiErrorResponse>({
    queryKey: [NOTICE_CACHE_KEY, typeId, page, limit],
    queryFn: () => NoticesApi.getAll(`?${params.toString()}`),
  });
};


export default useGetNotices;
