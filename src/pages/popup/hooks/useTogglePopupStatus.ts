import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { POPUP_CACHE_KEY } from "../../../constants";
import type { Popup } from "../model/PopupModel";
import APIClient from "../../../services/apiClient";

const useTogglePopupStatus = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useTogglePopupStatus must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Popup>, ApiErrorResponse, { id: number }>({
    mutationFn: ({ id }) => {
      const apiClient = new APIClient<Popup>(`/popup/${encodeURIComponent(id)}/toggle-status`);
      return apiClient.patch({});
    },
    onSuccess: (res) => {
      showToast(res.message || "Status updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [POPUP_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to update status";
      showToast(msg, "error");
    },
  });
};

export default useTogglePopupStatus;
