import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { GALLERY_CACHE_KEY, GALLERY_TYPE_CACHE_KEY } from "../../../../constants";
import type { GalleryType } from "../../model/GallModel";
import APIClient from "../../../../services/apiClient";

interface UpdateGalleryTypePayload {
  id: number;
  name: string;
}

export const useUpdateGalleryType = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Must be used inside AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<GalleryType>, ApiErrorResponse, UpdateGalleryTypePayload>({
    mutationFn: ({ id, name }) => {
      const apiClient = new APIClient<GalleryType>(`/gallery/type/${encodeURIComponent(id)}`);
      return apiClient.put({ name }); // ✅ send the name as payload
    },
    onSuccess: (res) => {
      showToast(res.message || "Gallery type updated", "success");
      queryClient.invalidateQueries({ queryKey: [GALLERY_TYPE_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [GALLERY_CACHE_KEY] });

    },
    onError: (err) => {
      showToast(err.message || "Failed to update gallery type", "error");
    },
  });
};
