import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { CategoryDetailWithTabs } from "../model/CourseWithDetails";
import { CourseCategoryDetailApi } from "../../course-category/services/CourseCatService";

const useGetCategoryDetail = (id: number | undefined) => {
  return useQuery<ApiResponse<CategoryDetailWithTabs>, ApiErrorResponse>({
    queryKey: ["course-cat-detail", id],
    queryFn: () => CourseCategoryDetailApi.get(`${id}/detail`),
    enabled: !!id,
  });
};

export default useGetCategoryDetail;
