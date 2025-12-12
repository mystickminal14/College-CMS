import APIClient from "../../../services/apiClient";
import type { Teams } from "../model/TeamsModel";

const TeamsApi = new APIClient<Teams>("/teams");

export default TeamsApi;
