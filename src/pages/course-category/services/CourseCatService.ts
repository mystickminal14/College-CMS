import APIClient from "../../../services/apiClient";
import type { CourseCategory } from "../model/CourseCatModel";

const CourseCategoryApi = new APIClient<CourseCategory>("/course-categories");

export default CourseCategoryApi;
