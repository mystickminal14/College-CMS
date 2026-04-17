import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { BLOG_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import type { Blog } from "../model/BlogsModel";

const useEditBlog = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useEditBlog must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Blog>, ApiErrorResponse,  Partial<Blog> & { id: number } >({
    mutationFn: (payload) => {
      if (!payload.id) throw new Error("Blog ID is required");
      const { id, ...updateData } = payload;
      return new APIClient<Blog>(`/blogs/${id}`).put(updateData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Blog updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [BLOG_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditBlog;