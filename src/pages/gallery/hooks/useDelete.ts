import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Gallerys } from "../model/GallModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { GALLERY_CACHE_KEY } from "../../../constants";
import GallerysApi from "../services/GalleryFiles";

const useDeleteGallerys = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteGallerys must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Gallerys>, ApiErrorResponse, Partial<Gallerys>>({
    mutationFn: (payload: Partial<Gallerys>) => {
      if (!payload.id) throw new Error("Gallerys ID is required");
      return GallerysApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Gallerys Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [GALLERY_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteGallerys;
