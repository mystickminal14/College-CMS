import APIClient from "../../../services/apiClient";
import type { Dept } from "../model/DeptModel";

const DeptApi = new APIClient<Dept>("/dept");

export default DeptApi;
