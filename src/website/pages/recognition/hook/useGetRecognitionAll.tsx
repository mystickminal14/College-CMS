import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { RECOGNITION_CACHE_KEY } from "../../../../constants";
import type { Recognitions, RecogType } from "../../../../pages/recognitions/model/RecognitionsModel";
import { recognitionsApiAll } from "../../../../pages/recognitions/services/RecognitionsService";

interface RecognitionsQueryProps {
    type?: RecogType|'';
  
}

const useGetAll = ({ type = "" }: RecognitionsQueryProps) => {
  return useQuery<ApiResponse<Recognitions[]>, ApiErrorResponse>({
    queryKey: [RECOGNITION_CACHE_KEY, type],
    queryFn: () =>
      recognitionsApiAll.getAll(
        type ? `?type=${type}` : ""
      ),
  });
};


export default useGetAll;
