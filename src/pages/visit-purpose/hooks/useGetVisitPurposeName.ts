import { useQuery } from "@tanstack/react-query";
import VisitPurposeApi from "../services/VisitPurposeService";
import type { VisitPurpose } from "../model/VisitPurposeModel";
import { VISIT_PURPOSE_NAME_CACHE_KEY } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

const useGetVisitPurposeNameAll = () => {
  return useQuery<ApiResponse<VisitPurpose[]>, ApiErrorResponse>({
    queryKey: [VISIT_PURPOSE_NAME_CACHE_KEY],
    queryFn: () => VisitPurposeApi.getAll("all"),
  });
};

export default useGetVisitPurposeNameAll;
