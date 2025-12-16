import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { TeamsByDepartment } from "../model/team-model";
import { DEPT_TEAM_CACHE_KEY,  } from "../../../../constants";
import { departmentTeam } from "../../../../pages/our-teams/services/TeamsService";


const useGetTeamsByDept = () => {

  return useQuery<ApiResponse<TeamsByDepartment>, ApiErrorResponse>({
    queryKey: [DEPT_TEAM_CACHE_KEY,],
    queryFn: () => departmentTeam.get(),
  });
};


export default useGetTeamsByDept;
