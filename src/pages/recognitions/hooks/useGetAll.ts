import {  useQuery,  } from "@tanstack/react-query";
import type { Recognitions } from "../model/RecognitionsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { RECOGNITION_CACHE_KEY } from "../../../constants";
import recognitionsApi from "../services/RecognitionsService";

interface RecognitionsQueryProps {
  page?: number;
  limit?: number;
}

const useGetRecognitions = ({ page = 1, limit = 10 }: RecognitionsQueryProps) => {
  return useQuery<ApiResponse<Recognitions[]>, ApiErrorResponse>({
    queryKey: [RECOGNITION_CACHE_KEY, page, limit],
    queryFn: () =>
      recognitionsApi.getAll(
        `?&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetRecognitions;
