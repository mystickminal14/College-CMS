import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";
import courseApi from "../services/CourseService";
import type { Courses } from "../model/CourseModel";

/** Every enabled course, with its shift and class timings included. */
const useGetEnabledCourses = () => {
  return useQuery<ApiResponse<Courses[]>, ApiErrorResponse>({
    queryKey: [COURSE_CACHE_KEY, "all"],
    queryFn: () => courseApi.getAll("all"),
  });
};

export default useGetEnabledCourses;
