import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { NewsModel } from "../model/NewsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NEWS_CACHE_KEY } from "../../../constants";

const useEditNews = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditNews must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<NewsModel>, ApiErrorResponse, Partial<NewsModel>>({
    mutationFn: (payload: Partial<NewsModel>) => {
      if (!payload.id) throw new Error("NewsModel ID is required");

      const { id, ...updateData } = payload;
      const apiClient = new APIClient<Partial<NewsModel>>(
        `/news/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "News updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [NEWS_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditNews;
