import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { INTAKE_CACHE_KEY } from "../../../constants";
import IntakesApi from '../services/IntakeService';
import type { Intakes } from "../model/IntakeModel";


const useGetIntakes = () => {
  return useQuery<ApiResponse<Intakes[]>, ApiErrorResponse>({
    queryKey: [INTAKE_CACHE_KEY],
    queryFn: () =>
      IntakesApi.getAll(
       
      ),
  });
};

export default useGetIntakes;
