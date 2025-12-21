import APIClient from "../../../services/apiClient";
import type { Connects } from "../model/Connects";

const ConnectsApi = new APIClient<Connects>("/connect");

export default ConnectsApi;
