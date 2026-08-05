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

const useCreateClassTiming = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useCreateClassTiming must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<ClassTiming>, ApiErrorResponse, ClassTiming>({
    mutationFn: (classTiming) => ClassTimingApi.post(classTiming),

    onSuccess: (res) => {
      showToast(res.message || "Class timing added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CLASS_TIMING_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLASS_TIMING_NAME_CACHE_KEY] });
    },

    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateClassTiming;
