import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { GALLERY_TYPE_CACHE_KEY } from "../../../../constants";
import type { GalleryGroup } from "../model/gallery-model";
import { GalleryGroupApi, } from "../../../../pages/gallery/services/GalleryFiles";

interface GalleryQueryProps {
  page?: number;
  limit?: number;
}

const useGroupGet = ({  page = 1, limit = 10 }: GalleryQueryProps) => {
   const params = new URLSearchParams();

 
  params.append("page", String(page));
  params.append("limit", String(limit));
  return useQuery<ApiResponse<GalleryGroup[]>, ApiErrorResponse>({
    queryKey: [GALLERY_TYPE_CACHE_KEY , page, limit],
    queryFn: () => GalleryGroupApi.getAll(`?${params.toString()}`),
  });
};

export default useGroupGet;
