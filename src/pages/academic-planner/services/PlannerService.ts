import APIClient from "../../../services/apiClient";
import type { AcademicPlanner, AcademicYear,   } from "../model/PlannerModel";


const plannerApi = new APIClient<AcademicPlanner>("/planner");
export const plannerApiAll = new APIClient<AcademicPlanner>("/planner");
export const academicYearApi = new APIClient<AcademicYear>(
  "/planner/academic_year"
);

export const academicYearGetApi = new APIClient<AcademicYear>(
  "/planner/academic_year"
);

export const academicYearPaginationApi = new APIClient<AcademicYear>(
  "/planner/academic_year/pagination"
);

export default plannerApi;
