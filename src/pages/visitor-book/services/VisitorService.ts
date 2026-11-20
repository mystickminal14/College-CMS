import VisitorApiClient from "./visitorClient";
import type { Visitor, VisitorPass, VisitorsTodaySummary } from "../model/VisitorModel";

const VisitorApi = new VisitorApiClient<Visitor>("/visitor");

export const VisitorTodayApi = new VisitorApiClient<VisitorsTodaySummary>("/visitor/today");
// Same filters as the listing, unpaginated — feeds the Excel download.
export const VisitorExportApi = new VisitorApiClient<Visitor>("/visitor/export");
export const VisitorPassApi = new VisitorApiClient<VisitorPass>("/visitor/pass");

export default VisitorApi;
