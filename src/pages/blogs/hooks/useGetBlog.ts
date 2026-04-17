import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { BLOG_CACHE_KEY } from "../../../constants";
import blogApi from "../services/BlogService";
import type { Blog } from "../model/BlogsModel";

interface BlogQueryProps {
    search?:string;
  page?: number;
  limit?: number;
  status?: "DRAFT" | "PUBLISHED" | "SCHEDULED";
}

const useGetBlogs = ({ search, page = 1, limit = 10, status }: BlogQueryProps) => {
  return useQuery<ApiResponse<Blog[]>, ApiErrorResponse>({
    queryKey: [BLOG_CACHE_KEY, search, page, limit, status],
    queryFn: () =>
      blogApi.getAll(
        `?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`
      ),
    refetchOnMount: true,
  });
};

export default useGetBlogs;