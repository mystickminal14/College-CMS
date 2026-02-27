import APIClient from "../../../services/apiClient";
import type { CategoryWithDetails } from "../../courses/model/CourseWithDetails";
import type { CourseCategory } from "../model/CourseCatModel";

const CourseCategoryApi = new APIClient<CourseCategory>("/course-categories");
export const CourseCategoryWithDetails = new APIClient<CategoryWithDetails>("/course-categories/with-courses");


export default CourseCategoryApi;
