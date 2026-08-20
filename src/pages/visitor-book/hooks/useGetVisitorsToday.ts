import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { VisitorsTodaySummary } from "../model/VisitorModel";
import { VisitorTodayApi } from "../services/VisitorService";
import { VISITOR_TODAY_CACHE_KEY } from "../../../constants";

const useGetVisitorsToday = () => {
  return useQuery<ApiResponse<VisitorsTodaySummary>, ApiErrorResponse>({
    queryKey: [VISITOR_TODAY_CACHE_KEY],
    queryFn: () => VisitorTodayApi.get(),
  });
};

export default useGetVisitorsToday;
