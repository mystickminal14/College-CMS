import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {GALLERY_CACHE_KEY } from "../../../constants";
import GallerysApi from "../services/GalleryFiles";
import type { Gallerys } from "../model/GallModel";
interface ConnectsQueryProps {
  page?: number;
  limit?: number;
}

const useGetGallerys = ({ page = 1,limit = 10 }: ConnectsQueryProps) => {
  return useQuery<ApiResponse<Gallerys[]>, ApiErrorResponse>({
    queryKey: [GALLERY_CACHE_KEY, page, limit],
    queryFn: () => GallerysApi.getAll(  `?page=${page}&limit=${limit}`),
  });
};

export default useGetGallerys;
