import APIClient from "../../../services/apiClient";
import type { ClassTiming } from "../model/ClassTimingModel";

const ClassTimingApi = new APIClient<ClassTiming>("/class-timings");

export default ClassTimingApi;
