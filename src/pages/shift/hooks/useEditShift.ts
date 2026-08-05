import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {
  COURSE_CACHE_KEY,
  SHIFT_CACHE_KEY,
  SHIFT_NAME_CACHE_KEY,
} from "../../../constants";
import type { Shift } from "../model/ShiftModel";

const useEditShift = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useEditShift must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<Shift>,
    ApiErrorResponse,
    Partial<Shift> & { id: number }
  >({
    mutationFn: (payload) => {
      const { id, ...updateData } = payload;

      const apiClient = new APIClient<Shift>(
        `/shifts/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Shift updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [SHIFT_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [SHIFT_NAME_CACHE_KEY] });
      // course rows embed the shift name
      queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditShift;

export const useChangeShiftStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<
    ApiResponse<Shift>,
    ApiErrorResponse,
    { id: number; status: "ENABLED" | "DISABLED" }
  >({
    mutationFn: ({ id, status }) => {
      if (!id) throw new Error("Shift ID is required for status change");

      const apiClient = new APIClient<Shift>(
        `/shifts/toggle-status/${encodeURIComponent(id)}`
      );

      return apiClient.put({ id, status });
    },
    onSuccess: (res) => {
      showToast(res.message || "Status changed successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [SHIFT_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [SHIFT_NAME_CACHE_KEY] });
    },
    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};
