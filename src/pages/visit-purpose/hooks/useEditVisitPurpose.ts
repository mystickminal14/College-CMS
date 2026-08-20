import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {
  VISIT_PURPOSE_CACHE_KEY,
  VISIT_PURPOSE_NAME_CACHE_KEY,
  VISITOR_CACHE_KEY,
} from "../../../constants";
import type { VisitPurpose } from "../model/VisitPurposeModel";

const useEditVisitPurpose = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditVisitPurpose must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<VisitPurpose>,
    ApiErrorResponse,
    Partial<VisitPurpose> & { id: number }
  >({
    mutationFn: (payload) => {
      const { id, ...updateData } = payload;

      const apiClient = new APIClient<VisitPurpose>(
        `/visit-purpose/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Purpose updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VISIT_PURPOSE_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISIT_PURPOSE_NAME_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISITOR_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditVisitPurpose;

export const useChangeVisitPurposeStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<
    ApiResponse<VisitPurpose>,
    ApiErrorResponse,
    { id: number; status: "ENABLED" | "DISABLED" }
  >({
    mutationFn: ({ id, status }) => {
      if (!id) throw new Error("Purpose ID is required for status change");

      const apiClient = new APIClient<VisitPurpose>(
        `/visit-purpose/toggle-status/${encodeURIComponent(id)}`
      );

      return apiClient.put({ id, status });
    },
    onSuccess: (res) => {
      showToast(res.message || "Status changed successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VISIT_PURPOSE_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISIT_PURPOSE_NAME_CACHE_KEY] });
    },
    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};
