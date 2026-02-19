import APIClient from "../../../services/apiClient";
import type { Courses } from "../model/CourseModel";

const courseApi = new APIClient<Courses>("/courses");

export const courseNameApi = new APIClient<Courses>("/courses/name");
export const courseApiAll = new APIClient<Courses>("/courses/all");
export const courseCopy = new APIClient<Courses>("/courses/copy");



export default courseApi;
