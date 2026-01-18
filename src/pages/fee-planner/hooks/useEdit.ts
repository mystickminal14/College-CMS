import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { AppContext } from "../../../context/ContextApp";
import type {
  EditPlannerPayload,
  FeePlanner,
} from "../model/PlannerModel";
import { FEE_PLANNEER_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";

const useUpdateFeePlanner = () => {
  const ctx = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!ctx) {
    throw new Error("useUpdateFeePlanner must be used within AppContext");
  }

  const { showToast } = ctx;

  return useMutation<
    ApiResponse<FeePlanner>,
    ApiErrorResponse,
    Partial<EditPlannerPayload>
  >({
    mutationFn: (payload) => {
      const formData = new FormData();

      if (payload.semester) formData.append("semester", payload.semester);
      if (payload.course) formData.append("course", payload.course);
     
      if (payload.feeYearId)
        formData.append("feeYearId", String(payload.feeYearId));
      if (payload.file)
        formData.append("files", payload.file as unknown as File);
      const ids = Number(payload.id);
      const apiClient = new APIClient<FeePlanner>(
        `/fee-planner/${encodeURIComponent(ids)}`,
      );

      return apiClient.putFile(formData);
    },

    onSuccess: (res) => {
      showToast(
        res.message || "Fee planner updated successfully",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: [FEE_PLANNEER_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong";
      showToast(msg, "error");
    },
  });
};

export default useUpdateFeePlanner;
