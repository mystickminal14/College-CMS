import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NOTICE_CACHE_KEY } from "../../../constants";
import NoticesApi from "../services/NoticeService";
import type { ENotice, Notices } from "../model/NoticeModel";
import { useQuery } from "@tanstack/react-query";

interface NoticesQueryProps {
  department?: ENotice|'';
  page?: number;
  limit?: number;
}

const useGetNotices = ({department = "", page = 1, limit = 10 }: NoticesQueryProps) => {
  const params = new URLSearchParams();

  if (department) params.append("type", department);
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<Notices[]>, ApiErrorResponse>({
    queryKey: [NOTICE_CACHE_KEY,  department, page, limit],
    queryFn: () => NoticesApi.getAll(`?${params.toString()}`),
  });
};


export default useGetNotices;
