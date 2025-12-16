import APIClient from "../../../services/apiClient";
import type { TeamsByDepartment } from "../../../website/pages/our-team/model/team-model";
import type { Teams } from "../model/TeamsModel";

const TeamsApi = new APIClient<Teams>("/teams");
export const departmentTeam = new APIClient<TeamsByDepartment>("/teams/department");

export default TeamsApi;
