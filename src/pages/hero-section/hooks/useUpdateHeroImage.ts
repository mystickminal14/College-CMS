import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { HERO_SECTION_CACHE_KEY } from "../../../constants";
import type { HeroSectionImage } from "../model/HeroModel";
import APIClient from "../../../services/apiClient";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";

interface UpdateHeroImagePayload {
  id: number;
  file: File;
}

const useUpdateHeroImage = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useUpdateHeroImage must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<HeroSectionImage>, ApiErrorResponse, UpdateHeroImagePayload>({
    mutationFn: async ({ id, file }) => {
      const validationError = validateImageFile(file);
      if (validationError) throw new Error(validationError);

      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("thumbnail", compressed);

      const apiClient = new APIClient<HeroSectionImage>(
        `/hero_section_image/${encodeURIComponent(id)}`
      );
      return apiClient.putFile(formData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Hero image updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [HERO_SECTION_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Update failed";
      showToast(msg, "error");
    },
  });
};

export default useUpdateHeroImage;