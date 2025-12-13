import APIClient from "../../../services/apiClient";
import type { Holidays } from "../model/HolidayModel";

const DownloadsApi = new APIClient<Holidays>("/holiday");

export default DownloadsApi;
