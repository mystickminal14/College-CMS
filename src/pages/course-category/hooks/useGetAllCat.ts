import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

import type { CourseCategory } from "../model/CourseCatModel";
import CourseCategoryApi from "../services/CourseCatService";
import { COURSE_CAT_CACHE_KEY } from "../../../constants";
interface AlumniQueryProps {
  search?: string;
  page?: number;
  status?: "ENABLED" | "DISABLED"|"";
  limit?: number;
}

const useGetAllCourseCategory = ({ search = "",status="", page = 1, limit = 10 }: AlumniQueryProps) => {
  return useQuery<ApiResponse<CourseCategory[]>, ApiErrorResponse>({
    queryKey: [COURSE_CAT_CACHE_KEY, search,status, page, limit],
    queryFn: () =>
      CourseCategoryApi.getAll(
        `?search=${encodeURIComponent(search)}&status=${status}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAllCourseCategory;
