import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import ClassTimingApi from "../services/ClassTimingService";
import type { ClassTiming } from "../model/ClassTimingModel";
import {
  CLASS_TIMING_CACHE_KEY,
  CLASS_TIMING_NAME_CACHE_KEY,
} from "../../../constants";

const useDeleteClassTiming = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteClassTiming must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<ClassTiming>, ApiErrorResponse, number>({
    mutationFn: (id) => ClassTimingApi.delete(id),
    onSuccess: (res) => {
      showToast(res.message || "Class timing deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CLASS_TIMING_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLASS_TIMING_NAME_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteClassTiming;
