import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { POPUP_CACHE_KEY } from "../../../constants";
import type { Popup, PopupSize } from "../model/PopupModel";
import PopupApi from "../services/PopupApi";

export interface AddPopupPayload {
  title: string;
  size: PopupSize;
  width?: number;
  height?: number;
  closesAt?: number;
  file: File;
}

const useAddPopup = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useAddPopup must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Popup>, ApiErrorResponse, AddPopupPayload>({
    mutationFn: ({ title, size, width, height, closesAt, file }) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("size", size);
      if (width) formData.append("width", String(width));
      if (height) formData.append("height", String(height));
      if (closesAt) formData.append("closesAt", String(closesAt));
      formData.append("image", file);

      return PopupApi.postFile(formData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Popup created successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [POPUP_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to create popup";
      showToast(msg, "error");
    },
  });
};

export default useAddPopup;
