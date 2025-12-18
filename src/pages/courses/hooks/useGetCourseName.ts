import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_NAME_CACHE_KEY } from "../../../constants";
import courseNameApi from "../services/CourseService";
import type { Courses } from "../model/CourseModel";

const useGetNameAll = () => {
  return useQuery<ApiResponse<Courses[]>, ApiErrorResponse>({
    queryKey: [COURSE_NAME_CACHE_KEY],
    queryFn: () => courseNameApi.getAll(),
  });
};

export default useGetNameAll;
