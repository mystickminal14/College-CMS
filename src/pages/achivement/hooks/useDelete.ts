import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { Achivement } from "../model/AchivementModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { ACHIVEMENT_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";

const apiClient = new APIClient<Achivement>("/achivement");

const useDeleteAchivement = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteAchivement must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Achivement>, ApiErrorResponse, Partial<Achivement>>({
    mutationFn: (payload: Partial<Achivement>) => {
      if (!payload.id) throw new Error("Achivement ID is required");
      return apiClient.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Achivement Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [ACHIVEMENT_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteAchivement;
