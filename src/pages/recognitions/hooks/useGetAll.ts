import {  useQuery,  } from "@tanstack/react-query";
import type { Recognitions, RecogType } from "../model/RecognitionsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { RECOGNITION_CACHE_KEY } from "../../../constants";
import recognitionsApi from "../services/RecognitionsService";

interface RecognitionsQueryProps {
  page?: number;
  limit?: number;
    type?: RecogType|'';
  
}

const useGetRecognitions = ({ page = 1, limit = 10,type="" }: RecognitionsQueryProps) => {
  return useQuery<ApiResponse<Recognitions[]>, ApiErrorResponse>({
    queryKey: [RECOGNITION_CACHE_KEY, page,type, limit],
    queryFn: () =>
      recognitionsApi.getAll(
        `?&page=${page}&limit=${limit}${type?`&type=${type}`:""}`
      ),
  });
};

export default useGetRecognitions;
