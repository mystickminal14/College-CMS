import APIClient from "../../../services/apiClient";
import type { NoticeType } from "../model/NoticeTypeModel";

const NoticeTypeApi = new APIClient<NoticeType>("/notice-types");

export default NoticeTypeApi;
