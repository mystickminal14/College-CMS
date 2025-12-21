import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Gallerys} from "../model/GallModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { GALLERY_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";

interface CreateimagePayload {
  image: File;
}

export const useUpdateimage = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useUpdateimage must be used within AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Gallerys>, ApiErrorResponse, CreateimagePayload>({
    mutationFn: async ({ image }) => {
      const validationError = validateImageFile(image);
      if (validationError) throw new Error(validationError);

      const compressedImage = await compressImage(image);
      const formData = new FormData();
      formData.append("image", compressedImage);
      const apiClient = new APIClient<Gallerys>("/gallery");
      return apiClient.postFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Image uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [GALLERY_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};
