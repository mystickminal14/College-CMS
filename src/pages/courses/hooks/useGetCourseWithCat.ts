import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {COURSE_CAT_DET_CACHE_KEY } from "../../../constants";
import  { CourseCategoryWithDetails } from "../../course-category/services/CourseCatService";
import type { CategoryWithDetails } from "../model/CourseWithDetails";


const useGetCatWithDetails = () => {

   return useQuery<ApiResponse<CategoryWithDetails[]>, ApiErrorResponse>({
    queryKey: [COURSE_CAT_DET_CACHE_KEY],
    queryFn: () => CourseCategoryWithDetails.getAll(),
  });
};

export default useGetCatWithDetails;
