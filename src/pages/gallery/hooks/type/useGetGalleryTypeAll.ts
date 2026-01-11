import { useQuery } from "@tanstack/react-query";
import type { GalleryType, STATUS } from "../../model/GallModel";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { GALLERY_TYPE_CACHE_KEY } from "../../../../constants";
import { GalleryTypeApi } from "../../services/GalleryFiles";

interface GalleryQueryProps {
  search?: string;
  status?: STATUS|"";
  page?: number;
  limit?: number;
}


const useGetAllGalleryTypes = ({ search = "", status = "", page = 1, limit = 10 }: GalleryQueryProps) => {
   const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (status) params.append("status", status);
  params.append("page", String(page));
  params.append("limit", String(limit));
  return useQuery<ApiResponse<GalleryType[]>, ApiErrorResponse>({
    queryKey: [GALLERY_TYPE_CACHE_KEY ,search, status, page, limit],
    queryFn: () => GalleryTypeApi.getAll(`all?${params.toString()}`),
  });
};

export default useGetAllGalleryTypes;
