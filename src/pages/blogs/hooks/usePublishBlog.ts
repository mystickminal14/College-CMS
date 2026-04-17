import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { BLOG_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import type { Blog } from "../model/BlogsModel";

const usePublishBlog = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("usePublishBlog must be inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Blog>, ApiErrorResponse, number>({
    mutationFn: (id) => new APIClient<Blog>(`/blogs/${id}/publish`).post({}),

    onSuccess: (res) => {
      showToast(res.message || "Blog published successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [BLOG_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default usePublishBlog;