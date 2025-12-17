import APIClient from "../../../services/apiClient";
import type {
  CreateParentPayload,
  Planners,
} from "../model/PlannerModel";

const plannerApi = new APIClient<CreateParentPayload>("/planner");
export const plannerApiAll = new APIClient<CreateParentPayload>("/planner/all");
export const plannerChildApi = new APIClient<CreateParentPayload>("/planner/child");
export const plannerFilesApi = new APIClient<null>(
  "/planner/files"
);
export const plannerChildrenApi = new APIClient<Planners>("/planner/child");
export const plannerGet = new APIClient<Planners>("/planner");
export const plannersParent = new APIClient<Planners>("/planner/all");

export default plannerApi;
