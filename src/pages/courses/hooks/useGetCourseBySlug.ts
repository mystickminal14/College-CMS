import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { courseBySlugApi } from "../services/CourseService";
import type { Courses } from "../model/CourseModel";

const useGetCourseBySlug = (slug: string) => {
  return useQuery<ApiResponse<Courses>, ApiErrorResponse>({
    queryKey: ["course-slug", slug],
    queryFn: () => courseBySlugApi.get(slug),
    enabled: !!slug,
  });
};

export default useGetCourseBySlug;
