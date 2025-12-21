import APIClient from "../../../services/apiClient";
import type { Gallerys } from "../model/GallModel";

const GallerysApi = new APIClient<Gallerys>("/gallery");

export default GallerysApi;
