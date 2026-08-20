import APIClient from "../../../services/apiClient";
import type { VisitPurpose } from "../model/VisitPurposeModel";

const VisitPurposeApi = new APIClient<VisitPurpose>("/visit-purpose");

export default VisitPurposeApi;
