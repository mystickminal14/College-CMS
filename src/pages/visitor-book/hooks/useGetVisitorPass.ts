import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { VisitorPass } from "../model/VisitorModel";
import { VisitorPassApi } from "../services/VisitorService";

const useGetVisitorPass = (qrToken: string | undefined) => {
  return useQuery<ApiResponse<VisitorPass>, ApiErrorResponse>({
    queryKey: ["visitor_pass", qrToken],
    queryFn: () => VisitorPassApi.get(qrToken),
    enabled: !!qrToken,
    retry: false,
  });
};

export default useGetVisitorPass;
