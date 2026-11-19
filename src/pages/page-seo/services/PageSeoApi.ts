import APIClient from "../../../services/apiClient";
import type { PageSeo } from "../model/PageSeoModel";

const PageSeoApi = new APIClient<PageSeo>("/page-seo");

export default PageSeoApi;
