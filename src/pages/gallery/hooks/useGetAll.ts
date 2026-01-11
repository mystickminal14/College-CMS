import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {GALLERY_CACHE_KEY } from "../../../constants";
import GallerysApi from "../services/GalleryFiles";
import type { Gallerys } from "../model/GallModel";
interface ConnectsQueryProps {
  page?: number;
  typeId?: number;

  limit?: number;
}

const useGetGallerys = ({ page = 1,limit = 10,typeId }: ConnectsQueryProps) => {
 const params = new URLSearchParams();

   if (typeId !== undefined) params.append("typeId", String(typeId));
  params.append("page", String(page));
  params.append("limit", String(limit));  return useQuery<ApiResponse<Gallerys[]>, ApiErrorResponse>({
    queryKey: [GALLERY_CACHE_KEY, page,typeId, limit],
    queryFn: () => GallerysApi.getAll(`?${params.toString()}`),
  });
};

export default useGetGallerys;
