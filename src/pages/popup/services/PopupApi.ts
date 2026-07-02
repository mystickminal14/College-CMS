import APIClient from "../../../services/apiClient";
import type { Popup } from "../model/PopupModel";

const PopupApi = new APIClient<Popup>("/popup");

export default PopupApi;
