import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { INTAKE_CACHE_KEY } from "../../../constants";
import IntakesApi from '../services/IntakeService';
import type { Intakes } from "../model/IntakeModel";

const useDeleteIntakes = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteIntakes must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Intakes>, ApiErrorResponse, Partial<Intakes>>({
    mutationFn: (payload: Partial<Intakes>) => {
      if (!payload.id) throw new Error("Intakes ID is required");
      return IntakesApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Intake Calender Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [INTAKE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteIntakes;
