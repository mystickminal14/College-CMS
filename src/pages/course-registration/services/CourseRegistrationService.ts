import APIClient from "../../../services/apiClient";
import type { CourseRegistration } from "../model/CourseRegistrationModel";

const courseRegistrationApi = new APIClient<CourseRegistration>("/course-registrations");

export default courseRegistrationApi;
