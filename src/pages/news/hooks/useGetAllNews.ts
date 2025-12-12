import { useQuery } from "@tanstack/react-query";
import type { NewsModel } from "../model/NewsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NEWS_CACHE_KEY } from "../../../constants";
import newsApi from '../services/NewsService';

interface NewsQueryProps {
  page?: number;
  limit?: number;
}

const useGetNews = ({  page = 1, limit = 10 }: NewsQueryProps) => {
  return useQuery<ApiResponse<NewsModel[]>, ApiErrorResponse>({
    queryKey: [NEWS_CACHE_KEY,  page, limit],
    queryFn: () =>
      newsApi.getAll(
        `?&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetNews;
