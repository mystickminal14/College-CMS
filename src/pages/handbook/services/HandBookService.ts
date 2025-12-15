import APIClient from "../../../services/apiClient";
import type { Downloads } from "../model/handbookModel";

const DownloadsApi = new APIClient<Downloads>("/downloads");

export default DownloadsApi;
