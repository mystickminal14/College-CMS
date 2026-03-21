import APIClient from "../../../services/apiClient";
import type { FAQ } from "../model/FAQmodel";

const FaqApi = new APIClient<FAQ>("/faq");

export default FaqApi;