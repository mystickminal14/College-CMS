import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { NewsModel } from "../model/NewsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NEWS_CACHE_KEY } from "../../../constants";
import newsApi from '../services/NewsService';

const useDeleteNews = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteNews must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<NewsModel>, ApiErrorResponse, Partial<NewsModel>>({
    mutationFn: (payload: Partial<NewsModel>) => {
      if (!payload.id) throw new Error("News ID is required");
      return newsApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Alumni Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [NEWS_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteNews;
