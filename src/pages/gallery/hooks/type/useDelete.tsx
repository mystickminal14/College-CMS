
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { GalleryTypeApi } from "../../services/GalleryFiles";
import { GALLERY_CACHE_KEY, GALLERY_TYPE_CACHE_KEY } from "../../../../constants";
import type { GalleryType } from "../../model/GallModel";


export const useDeleteGalleryType = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Must be inside AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<GalleryType>, ApiErrorResponse, number>({
    mutationFn: (id) => GalleryTypeApi.delete(`${id}`),

    onSuccess: (res) => {
      showToast(res.message || "Gallery type deleted", "success");
      queryClient.invalidateQueries({ queryKey: [GALLERY_TYPE_CACHE_KEY] });
            queryClient.invalidateQueries({ queryKey: [GALLERY_CACHE_KEY] });
      
    },

    onError: (err) => {
      showToast(err.message || "Failed to delete type", "error");
    },
  });
};
