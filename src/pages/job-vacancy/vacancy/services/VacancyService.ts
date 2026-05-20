import APIClient from "../../../../services/apiClient";
import type { JobVacancy } from "../model/VacancyModel";

const VacancyApi = new APIClient<JobVacancy>("/vacancy");

export default VacancyApi;
