import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { POPUP_CACHE_KEY } from "../../../constants";
import PopupApi from "../services/PopupApi";
import type { Popup } from "../model/PopupModel";

interface PopupQueryProps {
  page?: number;
  limit?: number;
}

const useGetPopups = ({ page = 1, limit = 10 }: PopupQueryProps) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<Popup[]>, ApiErrorResponse>({
    queryKey: [POPUP_CACHE_KEY, page, limit],
    queryFn: () => PopupApi.getAll(`?${params.toString()}`),
  });
};

export default useGetPopups;
