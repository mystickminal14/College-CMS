import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { HERO_SECTION_CACHE_KEY } from "../../../constants";
import type { HeroSectionImage } from "../model/HeroModel";
import APIClient from "../../../services/apiClient";

const useToggleHeroStatus = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useToggleHeroStatus must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<HeroSectionImage>, ApiErrorResponse, { id: number }>({
    mutationFn: ({ id }) => {
      const apiClient = new APIClient<HeroSectionImage>(
        `/hero_section_image/toggle-status/${encodeURIComponent(id)}`
      );
      return apiClient.put({});
    },
    onSuccess: (res) => {
      showToast(res.message || "Status updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [HERO_SECTION_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to update status";
      showToast(msg, "error");
    },
  });
};

export default useToggleHeroStatus;