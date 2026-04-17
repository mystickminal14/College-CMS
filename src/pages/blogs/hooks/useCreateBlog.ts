import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { BLOG_CACHE_KEY } from "../../../constants";
import type { Blog } from "../model/BlogsModel";
import blogApi from "../services/BlogService";

const useCreateBlog = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useCreateBlog must be used within AppContext provider");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Blog>, ApiErrorResponse, Blog>({
    mutationFn: (blog) => blogApi.post(blog),

    onSuccess: (res) => {
      showToast(res.message || "Blog created successfully!", "success");

      queryClient.setQueriesData(
        { queryKey: [BLOG_CACHE_KEY] },
        (oldData: ApiResponse<Blog[]> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: [res.data, ...(oldData.data || [])],
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: [BLOG_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useCreateBlog;