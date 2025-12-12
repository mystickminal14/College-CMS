import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { NewsModel } from "../model/NewsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NEWS_CACHE_KEY } from "../../../constants";
import newsApi from '../services/NewsService';

const useCreateNews = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateNews must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<NewsModel>, ApiErrorResponse, NewsModel>({
    mutationFn: (News) => newsApi.post(News),

    onSuccess: (res) => {
      showToast(res.message || "News added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [NEWS_CACHE_KEY] });
    },

    onError: (err) => {
        let errorMsg='';
      if (err.errors && err.errors.length > 0) {
       errorMsg=err.errors[0].message; 
      } else {
         errorMsg=err.message || "Something went wrong!";
      }
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateNews;
