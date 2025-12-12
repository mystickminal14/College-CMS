import APIClient from "../../../services/apiClient";
import type { NewsModel } from "../model/NewsModel";

const newsApi = new APIClient<NewsModel>("/news");

export default newsApi;
