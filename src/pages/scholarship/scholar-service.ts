import APIClient from "../../services/apiClient";
import type { ScholarshipSchedule } from "./model";

const scholarshipApi = new APIClient<ScholarshipSchedule>("/scholarship");

export default scholarshipApi;
