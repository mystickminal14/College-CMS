import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { RECOGNITION_CACHE_KEY } from "../../../../constants";
import type { Recognitions } from "../../../../pages/recognitions/model/RecognitionsModel";
import { recognitionsApiAll } from "../../../../pages/recognitions/services/RecognitionsService";



const useGetAll = () => {
  return useQuery<ApiResponse<Recognitions[]>, ApiErrorResponse>({
    queryKey: [RECOGNITION_CACHE_KEY],
    queryFn: () =>
      recognitionsApiAll.getAll(
       
      ),
  });
};

export default useGetAll;
