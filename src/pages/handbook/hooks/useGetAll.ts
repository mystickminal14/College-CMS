import { useQuery } from "@tanstack/react-query";
import type { Downloads } from "../model/handbookModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOWNLOAD_CACHE_KEY } from "../../../constants";
import DownloadsApi, { DownloadsAdminApi } from "../services/HandBookService";

interface DownloadsQueryProps {
  search?: string;
  page?: number;
  limit?: number;
  admin?: boolean;
}

const useGetDownloads = ({ page = 1, search = "", limit = 10, admin = false }: DownloadsQueryProps) => {
  const api = admin ? DownloadsAdminApi : DownloadsApi;
  return useQuery<ApiResponse<Downloads[]>, ApiErrorResponse>({
    queryKey: [DOWNLOAD_CACHE_KEY, search, page, limit, admin],
    queryFn: () =>
      api.getAll(`?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`),
  });
};

export default useGetDownloads;
