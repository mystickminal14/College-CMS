import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { PAGE_SEO_CACHE_KEY } from "../../../constants";
import type { PageSeo, PageSeoState, PageSeoType } from "../model/PageSeoModel";
import PageSeoApi from "../services/PageSeoApi";

interface PageSeoQueryProps {
  search?: string;
  type?: PageSeoType | "";
  state?: PageSeoState | "";
  page?: number;
  limit?: number;
}

const useGetPageSeo = ({
  search = "",
  type = "",
  state = "",
  page = 1,
  limit = 10,
}: PageSeoQueryProps) => {
  return useQuery<ApiResponse<PageSeo[]>, ApiErrorResponse>({
    queryKey: [PAGE_SEO_CACHE_KEY, search, type, state, page, limit],
    queryFn: () =>
      PageSeoApi.getAll(
        `?search=${encodeURIComponent(search)}&type=${type}&state=${state}&page=${page}&limit=${limit}`,
      ),
  });
};

export default useGetPageSeo;
