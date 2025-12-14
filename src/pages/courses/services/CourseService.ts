import APIClient from "../../../services/apiClient";
import type { Courses } from "../model/CourseModel";

const courseApi = new APIClient<Courses>("/courses");

export default courseApi;
