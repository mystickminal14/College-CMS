import {  useQuery,  } from "@tanstack/react-query";
import type { Downloads } from "../model/handbookModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOWNLOAD_CACHE_KEY } from "../../../constants";
import DownloadsApi from "../services/HandBookService";


interface DownloadsQueryProps {
  search?:string;
  page?: number;
  limit?: number;
}

const useGetDownloads = ({ page = 1, search= "",limit = 10 }: DownloadsQueryProps) => {
  return useQuery<ApiResponse<Downloads[]>, ApiErrorResponse>({
    queryKey: [DOWNLOAD_CACHE_KEY,search, page, limit],
    queryFn: () =>
      DownloadsApi.getAll(
        `?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetDownloads;
