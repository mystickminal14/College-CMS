import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { HERO_SECTION_CACHE_KEY } from "../../../constants";
import type { HeroSectionImage } from "../model/HeroModel";
import HeroSectionApi from "../services/HeroSectionFIles";

const useDeleteHeroImage = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useDeleteHeroImage must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<HeroSectionImage>, ApiErrorResponse, { id: number }>({
    mutationFn: ({ id }) => HeroSectionApi.delete(`${encodeURIComponent(id)}`),
    onSuccess: (res) => {
      showToast(res.message || "Hero image deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [HERO_SECTION_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteHeroImage;