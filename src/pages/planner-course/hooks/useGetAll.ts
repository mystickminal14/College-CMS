import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {  PLANNER_COURSE_CACHE_KEY } from "../../../constants";
import type { PlannerCourse } from "../model/PlannerCourse";
import plannerCourseApi from "../services/PlannerCourseService";

const useGetPlannerCourses = () => {
  return useQuery<ApiResponse<PlannerCourse[]>, ApiErrorResponse>({
    queryKey: [PLANNER_COURSE_CACHE_KEY],
    queryFn: () => plannerCourseApi.getAll(),
  });
};

export default useGetPlannerCourses;
