import APIClient from "../../../services/apiClient";
import type { PlannerCourse } from "../model/PlannerCourse";

const plannerCourseApi = new APIClient<PlannerCourse>("/planner-course");

export default plannerCourseApi;
