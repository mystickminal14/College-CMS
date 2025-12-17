import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { INTAKE_CACHE_KEY } from "../../../constants";
import type { Intakes } from "../model/IntakeModel";

const useEditIntakes = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditIntakes must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Intakes>, ApiErrorResponse, Partial<Intakes>>({
    mutationFn: (payload: Partial<Intakes>) => {
      if (!payload.id) throw new Error("Intakes ID is required");

      const { id, ...updateData } = payload;
      const apiClient = new APIClient<Partial<Intakes>>(
        `/intake/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Intake updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [INTAKE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditIntakes;
