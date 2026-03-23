import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import APIClient from "../../../services/apiClient";
import type { Courses } from "../model/CourseModel";

interface UseGetCourseByIdProps {
  courseId: string | number;
  enabled?: boolean;
}

const useGetCourseById = ({ courseId, enabled = true }: UseGetCourseByIdProps) => {
  return useQuery<ApiResponse<Courses>, ApiErrorResponse>({
    queryKey: ["course_by_id", courseId],
    queryFn: () => {
      const apiClient = new APIClient<Courses>(`/courses/${courseId}`);
      return apiClient.get();
    },
    enabled: !!courseId && enabled,
  });
};

export default useGetCourseById;