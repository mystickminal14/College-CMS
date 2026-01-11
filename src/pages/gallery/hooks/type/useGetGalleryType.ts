import { useQuery } from "@tanstack/react-query";
import type { GalleryType } from "../../model/GallModel";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { GALLERY_TYPE_CACHE_KEY } from "../../../../constants";
import { GalleryTypeApi } from "../../services/GalleryFiles";



const useGetGalleryTypes = () => {
  return useQuery<ApiResponse<GalleryType[]>, ApiErrorResponse>({
    queryKey: [GALLERY_TYPE_CACHE_KEY],
    queryFn: () => GalleryTypeApi.getAll(),
  });
};

export default useGetGalleryTypes;
