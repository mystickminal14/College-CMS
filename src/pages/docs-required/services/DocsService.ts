import APIClient from "../../../services/apiClient";
import type { Documents } from "../model/DocsModel";

const documentApi = new APIClient<Documents>("/docs");

export const documentApiAll = new APIClient<Documents>("/docs/all");

export default documentApi;
