import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { BLOG_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import type { Blog } from "../model/BlogsModel";

interface ReschedulePayload {
  id: number;
  publishDate: string; // ISO date string
}

const useRescheduleBlog = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useRescheduleBlog must be inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Blog>, ApiErrorResponse, ReschedulePayload>({
    mutationFn: ({ id, publishDate }) =>
      new APIClient<Blog>(`/blogs/${id}/reschedule`).put({ publishDate }),

    onSuccess: (res) => {
      showToast(res.message || "Blog rescheduled successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [BLOG_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useRescheduleBlog;