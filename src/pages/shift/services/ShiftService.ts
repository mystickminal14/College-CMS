import APIClient from "../../../services/apiClient";
import type { Shift } from "../model/ShiftModel";

const ShiftApi = new APIClient<Shift>("/shifts");

export default ShiftApi;
