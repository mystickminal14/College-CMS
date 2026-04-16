import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { BLOG_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";

const useDeleteBlog = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useDeleteBlog must be inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<unknown>, ApiErrorResponse, number>({
    mutationFn: (id: number) => {
      return new APIClient(`/blogs/${id}`).delete();
    },

    onSuccess: (res) => {
      showToast(res.message || "Blog deleted successfully!", "success");

      queryClient.invalidateQueries({ queryKey: [BLOG_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message ||
        err.message ||
        "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteBlog;