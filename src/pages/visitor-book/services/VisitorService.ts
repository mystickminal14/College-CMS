import VisitorApiClient from "./visitorClient";
import type { Visitor, VisitorPass, VisitorsTodaySummary } from "../model/VisitorModel";

const VisitorApi = new VisitorApiClient<Visitor>("/visitor");

export const VisitorTodayApi = new VisitorApiClient<VisitorsTodaySummary>("/visitor/today");
export const VisitorPassApi = new VisitorApiClient<VisitorPass>("/visitor/pass");

export default VisitorApi;
