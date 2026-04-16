import APIClient from "../../../services/apiClient";
import type { Blog } from "../model/BlogsModel";
const blogApi = new APIClient<Blog>("/blogs");
    

export default blogApi;
