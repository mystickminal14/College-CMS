import APIClient from "../../../services/apiClient";
import type {
  CreateParentPayload,
  Planners,
} from "../model/PlannerModel";

const plannerApi = new APIClient<CreateParentPayload>("/fee-planner");
export const plannerApiAll = new APIClient<CreateParentPayload>("/fee-planner/all");
export const plannerChildApi = new APIClient<CreateParentPayload>("/fee-planner/child");
export const plannerFilesApi = new APIClient<null>(
  "/fee-planner/files"
);
export const plannerChildrenApi = new APIClient<Planners>("/fee-planner/child");
export const plannerGet = new APIClient<Planners>("/fee-planner");
export const plannersParent = new APIClient<Planners>("/fee-planner/all");

export default plannerApi;
