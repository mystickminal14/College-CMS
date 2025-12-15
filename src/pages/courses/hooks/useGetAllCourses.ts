import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";
import courseApi from "../services/CourseService";
import type { Courses } from "../model/CourseModel";
interface AlumniQueryProps {
  search?: string;
  page?: number;
  limit?: number;
}

const useGetAll = ({ search = "", page = 1, limit = 10 }: AlumniQueryProps) => {
  return useQuery<ApiResponse<Courses[]>, ApiErrorResponse>({
    queryKey: [COURSE_CACHE_KEY, search, page, limit],
    queryFn: () =>
      courseApi.getAll(
        `?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetAll;
