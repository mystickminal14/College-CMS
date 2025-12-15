import APIClient from "../../../services/apiClient";
import type { Notices } from "../model/NoticeModel";

const NoticesApi = new APIClient<Notices>("/notice");

export default NoticesApi;
