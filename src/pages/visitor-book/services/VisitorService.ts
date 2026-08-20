import APIClient from "../../../services/apiClient";
import type { Visitor, VisitorPass, VisitorsTodaySummary } from "../model/VisitorModel";

const VisitorApi = new APIClient<Visitor>("/visitor");

export const VisitorTodayApi = new APIClient<VisitorsTodaySummary>("/visitor/today");
export const VisitorPassApi = new APIClient<VisitorPass>("/visitor/pass");

export default VisitorApi;
