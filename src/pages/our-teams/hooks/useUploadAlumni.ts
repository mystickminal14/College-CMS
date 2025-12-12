import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Teams } from "../model/TeamsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { TEAM_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";
export const useUploadTeamsImage = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useUploadTeamsImage must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<Teams>, ApiErrorResponse, { id: number; image: File }>({
    mutationFn: async ({ id, image }) => {
      const validationError = validateImageFile(image);
      if (validationError) throw new Error(validationError);
      
      const compressedImage = await compressImage(image);
      
      const formData = new FormData();
      formData.append("image", compressedImage);

      const apiClient = new APIClient<Teams>(`/teams/upload/${id}`);
      return apiClient.postImage(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Teams image uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [TEAM_CACHE_KEY] });
    },


    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

