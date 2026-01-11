import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Gallerys } from "../model/GallModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { GALLERY_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";

export interface CreateImagesPayload {
  images?: File[];
  links?: string[];
  typeId: number;
  slug:string;
}

export const useUpdateImages = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useUpdateImages must be used within AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Gallerys>, ApiErrorResponse, CreateImagesPayload>({
    mutationFn: async ({ images = [], links = [], typeId, slug }) => {
      const formData = new FormData();

      formData.append("typeId", String(typeId));
      formData.append("slug", slug);

      if (images.length) {
        const compressedImages = await Promise.all(
          images.map(async (file) => {
            const validationError = validateImageFile(file);
            if (validationError) throw new Error(validationError);
            return compressImage(file);
          })
        );

        compressedImages.forEach((file) => {
          formData.append("images", file);
        });
      }

      /* LINKS */
      if (links.length) {
        links.forEach((link) => {
          formData.append("links[]", link);
        });
      }

      const apiClient = new APIClient<Gallerys>("/gallery");
      return apiClient.postFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Gallery saved!", "success");
      queryClient.invalidateQueries({ queryKey: [GALLERY_CACHE_KEY] });
    },

    onError: (err) => {
      showToast(err.message || "Upload failed", "error");
    },
  });
};

