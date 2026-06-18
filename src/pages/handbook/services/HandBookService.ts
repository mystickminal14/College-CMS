import APIClient from "../../../services/apiClient";
import type { Downloads } from "../model/handbookModel";

const DownloadsApi = new APIClient<Downloads>("/downloads");
export const DownloadsAdminApi = new APIClient<Downloads>("/downloads/admin-list");

export default DownloadsApi;
