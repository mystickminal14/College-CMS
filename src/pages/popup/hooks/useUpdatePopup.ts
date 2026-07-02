import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { POPUP_CACHE_KEY } from "../../../constants";
import type { Popup, PopupSize } from "../model/PopupModel";
import APIClient from "../../../services/apiClient";

export interface UpdatePopupPayload {
  id: number;
  title?: string;
  size?: PopupSize;
  width?: number;
  height?: number;
  closesAt?: number;
  file?: File;
}

const useUpdatePopup = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useUpdatePopup must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Popup>, ApiErrorResponse, UpdatePopupPayload>({
    mutationFn: ({ id, title, size, width, height, closesAt, file }) => {
      const formData = new FormData();
      if (title) formData.append("title", title);
      if (size) formData.append("size", size);
      if (width) formData.append("width", String(width));
      if (height) formData.append("height", String(height));
      if (closesAt) formData.append("closesAt", String(closesAt));
      if (file) formData.append("image", file);

      const apiClient = new APIClient<Popup>(`/popup/${encodeURIComponent(id)}`);
      return apiClient.putFile(formData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Popup updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [POPUP_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to update popup";
      showToast(msg, "error");
    },
  });
};

export default useUpdatePopup;
