import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {
  CLASS_TIMING_CACHE_KEY,
  CLASS_TIMING_NAME_CACHE_KEY,
  COURSE_CACHE_KEY,
} from "../../../constants";
import type { ClassTiming } from "../model/ClassTimingModel";

const useEditClassTiming = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditClassTiming must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<ClassTiming>,
    ApiErrorResponse,
    Partial<ClassTiming> & { id: number }
  >({
    mutationFn: (payload) => {
      const { id, ...updateData } = payload;

      const apiClient = new APIClient<ClassTiming>(
        `/class-timings/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Class timing updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CLASS_TIMING_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLASS_TIMING_NAME_CACHE_KEY] });
      // course pages embed the timing values
      queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditClassTiming;

export const useChangeClassTimingStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<
    ApiResponse<ClassTiming>,
    ApiErrorResponse,
    { id: number; status: "ENABLED" | "DISABLED" }
  >({
    mutationFn: ({ id, status }) => {
      if (!id) throw new Error("Class timing ID is required for status change");

      const apiClient = new APIClient<ClassTiming>(
        `/class-timings/toggle-status/${encodeURIComponent(id)}`
      );

      return apiClient.put({ id, status });
    },
    onSuccess: (res) => {
      showToast(res.message || "Status changed successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CLASS_TIMING_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLASS_TIMING_NAME_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY] });
    },
    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};
