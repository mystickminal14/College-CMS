import APIClient from "../../../services/apiClient";
import type { Intakes } from "../model/IntakeModel";

const intakeApi = new APIClient<Intakes>("/intake");

export default intakeApi;
