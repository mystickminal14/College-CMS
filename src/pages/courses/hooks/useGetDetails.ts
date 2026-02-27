import { useInfiniteQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";
import type { CourseDetailBlock } from "../model/CourseDetailModel";

interface UseGetCourseDetailsProps {
  courseId: string;
  limit?: number;
  category:string;
}

// remove the limit parameter cause of need the all the data of course details at once.
const useGetCourseDetails = ({ courseId,category,limit }: UseGetCourseDetailsProps) => {
  return useInfiniteQuery<ApiResponse<CourseDetailBlock[]>, ApiErrorResponse>({
    queryKey: [COURSE_CACHE_KEY, courseId, category,"details"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      const apiClient = new APIClient<CourseDetailBlock[]>(
        `/courses/${courseId}/details/${category}?page=${pageParam}&limit=${limit || 50}`,
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
