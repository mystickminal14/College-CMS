import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { POPUP_CACHE_KEY } from "../../../constants";
import PopupApi from "../services/PopupApi";
import type { Popup } from "../model/PopupModel";

const useGetActivePopup = () => {
  return useQuery<ApiResponse<Popup | null>, ApiErrorResponse>({
    queryKey: [POPUP_CACHE_KEY, "active"],
    queryFn: () => PopupApi.get("active"),
  });
};

export default useGetActivePopup;
