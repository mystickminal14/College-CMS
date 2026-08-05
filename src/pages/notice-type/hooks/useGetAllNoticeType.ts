import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

import type { NoticeType } from "../model/NoticeTypeModel";
import NoticeTypeApi from "../services/NoticeTypeService";
import { NOTICE_TYPE_CACHE_KEY } from "../../../constants";

interface NoticeTypeQueryProps {
  search?: string;
  page?: number;
  status?: "ENABLED" | "DISABLED" | "";
  limit?: number;
}

const useGetAllNoticeType = ({
  search = "",
  status = "",
  page = 1,
  limit = 10,
}: NoticeTypeQueryProps) => {
  return useQuery<ApiResponse<NoticeType[]>, ApiErrorResponse>({
    queryKey: [NOTICE_TYPE_CACHE_KEY, search, status, page, limit],
    queryFn: () =>
      NoticeTypeApi.getAll(
        `?search=${encodeURIComponent(search)}&status=${status}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAllNoticeType;
