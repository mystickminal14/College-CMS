import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { HERO_SECTION_CACHE_KEY } from "../../../constants";
import type { HeroSectionImage } from "../model/HeroModel";
import APIClient from "../../../services/apiClient";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";

const useAddHeroImage = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useAddHeroImage must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<HeroSectionImage>, ApiErrorResponse, { file: File }>({
    mutationFn: async ({ file }) => {
      const validationError = validateImageFile(file);
      if (validationError) throw new Error(validationError);

      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("thumbnail", compressed);

      const apiClient = new APIClient<HeroSectionImage>("/hero_section_image");
      return apiClient.postFile(formData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Hero image added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [HERO_SECTION_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Upload failed";
      showToast(msg, "error");
    },
  });
};

export default useAddHeroImage;