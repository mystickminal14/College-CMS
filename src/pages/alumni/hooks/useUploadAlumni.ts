import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { Alumni } from "../model/AlumniModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { ALUMNI_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";

export const useUploadAlumniImage = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useUploadAlumniImage must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<Alumni>, ApiErrorResponse, { id: number; image: File }>({
    mutationFn: async ({ id, image }) => {
      const validationError = validateImageFile(image);
      if (validationError) throw new Error(validationError);
      
      const compressedImage = await compressImage(image);
      
      const formData = new FormData();
      formData.append("image", compressedImage);

      const apiClient = new APIClient<Alumni>(`/alumni/upload/${id}`);
      return apiClient.postImage(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Alumni image uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [ALUMNI_CACHE_KEY] });
    },


    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

