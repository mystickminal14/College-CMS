import { useQuery } from "@tanstack/react-query";
import { COURSE_REGISTRATION_CACHE_KEY } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { CourseRegistration } from "../model/CourseRegistrationModel";
import APIClient from "../../../services/apiClient";

interface QueryProps {
  page?: number;
  limit?: number;
  search?: string;
  date?: string;
}

const useGetAllCourseRegistrations = ({ page = 1, limit = 10, search = "", date = "" }: QueryProps) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  if (search) params.append("search", search);
  if (date) params.append("date", date);

  return useQuery<ApiResponse<CourseRegistration[]>, ApiErrorResponse>({
    queryKey: [COURSE_REGISTRATION_CACHE_KEY, page, limit, search, date],
    queryFn: () => {
      const api = new APIClient<CourseRegistration>("/course-registrations");
      return api.getAll(`?${params.toString()}`);
    },
  });
};

export default useGetAllCourseRegistrations;
