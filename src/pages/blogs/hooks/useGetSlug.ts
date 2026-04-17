import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { BLOG_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";
import type { Blog } from "../model/BlogsModel";

const useGetSlug = (slug: string) => {
  return useQuery<ApiResponse<Blog>, ApiErrorResponse>({
    queryKey: [BLOG_CACHE_KEY, slug],
    queryFn: () => new APIClient<Blog>(`/blogs/slug/${slug}`).get(),
    enabled: !!slug,
  });
};

export default useGetSlug;