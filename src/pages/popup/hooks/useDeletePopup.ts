import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { POPUP_CACHE_KEY } from "../../../constants";
import type { Popup } from "../model/PopupModel";
import PopupApi from "../services/PopupApi";

const useDeletePopup = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useDeletePopup must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Popup>, ApiErrorResponse, { id: number }>({
    mutationFn: ({ id }) => PopupApi.delete(`${encodeURIComponent(id)}`),
    onSuccess: (res) => {
      showToast(res.message || "Popup deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [POPUP_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeletePopup;
