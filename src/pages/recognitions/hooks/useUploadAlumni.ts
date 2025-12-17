import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Recognitions } from "../model/RecognitionsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { RECOGNITION_CACHE_KEY } from "../../../constants";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";
import APIClient from "../../../services/apiClient";


export const useUploadRecognitionsImage = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useUploadRecognitionsImage must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<Recognitions>, ApiErrorResponse, { id: number; image: File }>({
    mutationFn: async ({ id, image }) => {
      const validationError = validateImageFile(image);
      if (validationError) throw new Error(validationError);
      
      const compressedImage = await compressImage(image);
      
      const formData = new FormData();
      formData.append("image", compressedImage);

      const apiClient = new APIClient<Recognitions>(`/recognition/update-image/${id}`);
      return apiClient.postImage(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Recognitions image uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [RECOGNITION_CACHE_KEY] });
    },


    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

