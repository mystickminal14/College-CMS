import APIClient from "../../../services/apiClient";
import type { Achivement } from "../model/AchivementModel";

const achivementApi = new APIClient<Achivement>("/achivement");

export default achivementApi;
