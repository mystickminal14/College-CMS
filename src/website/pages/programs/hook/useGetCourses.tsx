import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { Courses } from "../../../../pages/courses/model/CourseModel";
import { COURSE_CACHE_KEY } from "../../../../constants";
import { courseApiAll } from "../../../../pages/courses/services/CourseService";



const useGetAll = () => {
  return useQuery<ApiResponse<Courses[]>, ApiErrorResponse>({
    queryKey: [COURSE_CACHE_KEY],
    queryFn: () =>
      courseApiAll.getAll(
       
      ),
  });
};

export default useGetAll;
