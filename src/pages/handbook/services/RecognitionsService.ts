import APIClient from "../../../services/apiClient";
import type { Recognitions } from "../model/RecognitionsModel";

const recognitionsApi = new APIClient<Recognitions>("/recognition");

export default recognitionsApi;
