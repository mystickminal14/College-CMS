import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { AppContext } from "../../../context/ContextApp";
import type { GalleryType } from "../model/GallModel";
import { GALLERY_TYPE_CACHE_KEY } from "../../../constants";

type TogglePayload = {
  id: number;
  status: "ENABLED" | "DISABLED";
};

const useToggleGalleryTypeStatus = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useToggleGalleryTypeStatus must be used inside AppContext");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<GalleryType>, ApiErrorResponse, TogglePayload>({
    mutationFn: ({ id, status }) => {
      const apiClient = new APIClient<GalleryType>(
        `/gallery/status/${encodeURIComponent(id)}`
      );

      return apiClient.put({ status });
    },

    onSuccess: (res) => {
      showToast(res.message || "GalleryType status updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: [GALLERY_TYPE_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message ||
        err.message ||
        "Failed to update gallerytype status";
      showToast(msg, "error");
    },
  });
};

export default useToggleGalleryTypeStatus;
