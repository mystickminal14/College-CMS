import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { BLOG_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";
import type { Blog } from "../model/BlogsModel";

const useGetBlogById = (id: string) => {
  return useQuery<ApiResponse<Blog>, ApiErrorResponse>({
    queryKey: [BLOG_CACHE_KEY, id],
    queryFn: () => new APIClient<Blog>(`/blogs/${id}`).get(),
    enabled: !!id,
  });
};

export default useGetBlogById;