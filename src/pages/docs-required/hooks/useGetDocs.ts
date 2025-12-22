import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOCUMENT_CACHE_KEY } from "../../../constants";
import type { Documents } from "../model/DocsModel";
import documentApi from "../services/DocsService";

interface DocsQueryProps {
  search?: string;
  page?: number;
  limit?: number;
}

const useGetAll = ({ search = "", page = 1, limit = 10 }: DocsQueryProps) => {
  return useQuery<ApiResponse<Documents[]>, ApiErrorResponse>({
    queryKey: [DOCUMENT_CACHE_KEY, search, page, limit],
    queryFn: () =>
      documentApi.getAll(
        `?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAll;
