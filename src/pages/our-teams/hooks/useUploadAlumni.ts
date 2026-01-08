import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Teams } from "../model/TeamsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { TEAM_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";
import { compressImage } from "../../../utils/ImageCompression";
export const useUploadTeamsImage = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<
    ApiResponse<Teams>,
    ApiErrorResponse,
    { id: number; image: File | null; portrait: File | null } // ✅ match modal
  >({
    mutationFn: async ({ id, image, portrait }) => {
      const formData = new FormData();
      if (image) formData.append("image", await compressImage(image));
      if (portrait) formData.append("portrait", await compressImage(portrait));
      const api = new APIClient<Teams>(`/teams/upload/${id}`);
      return api.postImage(formData);
    },
    onSuccess: () => {
      showToast("Images uploaded successfully", "success");
      queryClient.invalidateQueries({ queryKey: [TEAM_CACHE_KEY] });
    },
  });
};


