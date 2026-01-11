import APIClient from "../../../services/apiClient";
import type { GalleryGroup } from "../../../website/pages/gallery/model/gallery-model";
import type { Gallerys, GalleryType } from "../model/GallModel";

const GallerysApi = new APIClient<Gallerys>("/gallery");
export const GalleryTypeApi = new APIClient<GalleryType>("/gallery/type");
export const GalleryGroupApi = new APIClient<GalleryGroup>("/gallery/gallery-type");

export default GallerysApi;
