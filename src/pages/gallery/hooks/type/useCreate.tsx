
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { GalleryType } from "../../model/GallModel";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { GalleryTypeApi } from "../../services/GalleryFiles";
import { GALLERY_TYPE_CACHE_KEY } from "../../../../constants";

export const useCreateGalleryType = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Must be inside AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<GalleryType>, ApiErrorResponse, { name: string }>({
    mutationFn: (payload) => GalleryTypeApi.post(payload),

    onSuccess: (res) => {
      showToast(res.message || "Gallery type created", "success");
      queryClient.invalidateQueries({ queryKey: [GALLERY_TYPE_CACHE_KEY] });
    },

    onError: (err) => {
      showToast(err.message || "Failed to create type", "error");
    },
  });
};
