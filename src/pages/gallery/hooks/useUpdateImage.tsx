import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Gallerys } from "../model/GallModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { GALLERY_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";

interface CreateImagesPayload {
  images: File[];
}

export const useUpdateImages = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useUpdateImages must be used within AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Gallerys>, ApiErrorResponse, CreateImagesPayload>({
    mutationFn: async ({ images }) => {
      if (!images.length) throw new Error("Please select at least one image");

      // Validate each image
      images.forEach((file) => {
        const validationError = validateImageFile(file);
        if (validationError) throw new Error(validationError);
      });

      // Compress images
      const compressedImages = await Promise.all(images.map((img) => compressImage(img)));

      const formData = new FormData();
      compressedImages.forEach((img) => formData.append("images", img));

      const apiClient = new APIClient<Gallerys>("/gallery");
      return apiClient.postFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Images uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [GALLERY_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};
