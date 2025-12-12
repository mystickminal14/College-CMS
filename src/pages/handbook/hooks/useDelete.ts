import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Recognitions } from "../model/RecognitionsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { RECOGNITION_CACHE_KEY } from "../../../constants";
import recognitionsApi from "../services/RecognitionsService";

const useDeleteRecognitions = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteRecognitions must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Recognitions>, ApiErrorResponse, Partial<Recognitions>>({
    mutationFn: (payload: Partial<Recognitions>) => {
      if (!payload.id) throw new Error("Recognitions ID is required");
      return recognitionsApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Recognitions Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [RECOGNITION_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteRecognitions;
