import { useQuery } from "@tanstack/react-query";
import CourseCategoryApi from "../services/CourseCatService";
import type { CourseCategory } from "../model/CourseCatModel";
import { COURSE_CAT_CACHE_KEY } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

const useGetCourseCategoryNameAll = () => {
  return useQuery<ApiResponse<CourseCategory[]>, ApiErrorResponse>({
    queryKey: [COURSE_CAT_CACHE_KEY],
    queryFn: () => CourseCategoryApi.getAll('all'),
  });
};

export default useGetCourseCategoryNameAll;
