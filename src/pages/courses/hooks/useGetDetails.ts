import { useInfiniteQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";
import type { CourseDetailBlock } from "../model/CourseDetailModel";

interface UseGetCourseDetailsProps {
  courseId: string;
  limit?: number;
}

const useGetCourseDetails = ({ courseId, limit = 5 }: UseGetCourseDetailsProps) => {
  return useInfiniteQuery<ApiResponse<CourseDetailBlock[]>, ApiErrorResponse>({
    queryKey: [COURSE_CACHE_KEY, courseId, "details"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      const apiClient = new APIClient<CourseDetailBlock[]>(
        `/courses/${courseId}/details?page=${pageParam}&limit=50`,
      );
      return apiClient.get();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination?.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined;
    },
  });
};

export default useGetCourseDetails;
