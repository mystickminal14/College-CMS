import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NOTICE_CACHE_KEY } from "../../../constants";
import NoticesApi from "../services/NoticeService";
import type {  Notices } from "../model/NoticeModel";
import { useQuery } from "@tanstack/react-query";



const useGetNoticesAll = () => {


  return useQuery<ApiResponse<Notices[]>, ApiErrorResponse>({
    queryKey: [NOTICE_CACHE_KEY],
    queryFn: () => NoticesApi.getAll('all'),
  });
};


export default useGetNoticesAll;
