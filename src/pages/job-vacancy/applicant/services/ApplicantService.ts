import APIClient from "../../../../services/apiClient";
import type { JobApplication } from "../model/ApplicantModel";

const ApplicantApi = new APIClient<JobApplication>("/vacancy");

export default ApplicantApi;
