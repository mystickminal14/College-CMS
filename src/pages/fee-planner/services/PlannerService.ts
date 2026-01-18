import APIClient from "../../../services/apiClient";
import type { FeePlanner, FeeYear,   } from "../model/PlannerModel";


const plannerApi = new APIClient<FeePlanner>("/fee-planner");
export const plannerApiAll = new APIClient<FeePlanner>("/fee-planner");
export const feeYearApi = new APIClient<FeeYear>(
  "/fee-planner/fee_year"
);

export const feeYearGetApi = new APIClient<FeeYear>(
  "/fee-planner/fee_year"
);

export const feeYearPaginationApi = new APIClient<FeeYear>(
  "/fee-planner/fee_year/pagination"
);

export default plannerApi;
