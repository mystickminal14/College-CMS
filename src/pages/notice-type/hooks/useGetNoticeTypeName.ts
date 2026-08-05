import { useQuery } from "@tanstack/react-query";
import NoticeTypeApi from "../services/NoticeTypeService";
import type { NoticeType } from "../model/NoticeTypeModel";
import { NOTICE_TYPE_NAME_CACHE_KEY } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

const useGetNoticeTypeNameAll = () => {
  return useQuery<ApiResponse<NoticeType[]>, ApiErrorResponse>({
    queryKey: [NOTICE_TYPE_NAME_CACHE_KEY],
    queryFn: () => NoticeTypeApi.getAll("all"),
  });
};

export default useGetNoticeTypeNameAll;
