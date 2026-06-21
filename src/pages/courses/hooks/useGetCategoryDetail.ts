import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { CategoryWithDetails } from "../model/CourseWithDetails";
import { CourseCategoryWithDetails } from "../../course-category/services/CourseCatService";

const useGetCategoryDetail = (id: number | undefined) => {
  return useQuery<ApiResponse<CategoryWithDetails>, ApiErrorResponse>({
    queryKey: ["course-cat-detail", id],
    queryFn: () => CourseCategoryWithDetails.get(`${id}/detail`),
    enabled: !!id,
  });
};

export default useGetCategoryDetail;
