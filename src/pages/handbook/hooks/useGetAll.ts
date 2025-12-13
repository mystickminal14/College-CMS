import {  useQuery,  } from "@tanstack/react-query";
import type { Downloads } from "../model/handbookModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOWNLOAD_CACHE_KEY } from "../../../constants";
import DownloadsApi from "../services/HandBookService";


interface DownloadsQueryProps {
  page?: number;
  limit?: number;
}

const useGetDownloads = ({ page = 1, limit = 10 }: DownloadsQueryProps) => {
  return useQuery<ApiResponse<Downloads[]>, ApiErrorResponse>({
    queryKey: [DOWNLOAD_CACHE_KEY, page, limit],
    queryFn: () =>
      DownloadsApi.getAll(
        `?&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetDownloads;
