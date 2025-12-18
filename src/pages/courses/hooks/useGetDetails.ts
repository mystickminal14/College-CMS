import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";
import type { CourseDetailBlock } from "../model/CourseDetailModel";

interface UseGetCourseDetailsProps {
  courseId: string;
}

const useGetCourseDetails = ({ courseId }: UseGetCourseDetailsProps) => {
  return useQuery<ApiResponse<CourseDetailBlock[]>, ApiErrorResponse>({
    queryKey: [COURSE_CACHE_KEY, courseId, "details"],
    queryFn: () => {
      const apiClient = new APIClient<CourseDetailBlock[]>(
        `/courses/${courseId}/details`
      );
      return apiClient.get();
    },
  });
};

export default useGetCourseDetails;
