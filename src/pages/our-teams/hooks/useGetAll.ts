import type { Department, Teams } from "../model/TeamsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { TEAM_CACHE_KEY } from "../../../constants";
import TeamsApi from "../services/TeamsService";
import { useQuery } from "@tanstack/react-query";

interface TeamsQueryProps {
  search?: string;
  department?: Department|'';
  page?: number;
  limit?: number;
}

const useGetTeams = ({ search = "", department = "", page = 1, limit = 10 }: TeamsQueryProps) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (department) params.append("department", department);
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<Teams[]>, ApiErrorResponse>({
    queryKey: [TEAM_CACHE_KEY, search, department, page, limit],
    queryFn: () => TeamsApi.getAll(`?${params.toString()}`),
  });
};


export default useGetTeams;
