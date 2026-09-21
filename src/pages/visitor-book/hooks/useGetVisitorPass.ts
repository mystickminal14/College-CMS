import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { VisitorPass } from "../model/VisitorModel";
import { VisitorPassApi } from "../services/VisitorService";
import { VISITOR_PASS_CACHE_KEY } from "../../../constants";

const useGetVisitorPass = (qrToken: string | undefined) => {
  return useQuery<ApiResponse<VisitorPass>, ApiErrorResponse>({
    queryKey: [VISITOR_PASS_CACHE_KEY, qrToken],
    queryFn: () => VisitorPassApi.get(qrToken),
    enabled: !!qrToken,
    retry: false,
  });
};

export default useGetVisitorPass;
