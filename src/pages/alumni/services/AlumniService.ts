import APIClient from "../../../services/apiClient";
import type { Alumni } from "../model/AlumniModel";

const alumniApi = new APIClient<Alumni>("/alumni");

export default alumniApi;
