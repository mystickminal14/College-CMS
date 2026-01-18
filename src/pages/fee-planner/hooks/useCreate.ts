import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { FEE_PLANNEER_CACHE_KEY } from "../../../constants";
import plannerApi from "../services/PlannerService";
import type { CreatePlannerPayload, FeePlanner } from "../model/PlannerModel";

const useCreateFeePlanner = () => {
  const ctx = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!ctx) {
    throw new Error("useCreateFeePlanner must be used within AppContext");
  }

  const { showToast } = ctx;

  return useMutation<
    ApiResponse<FeePlanner>,
    ApiErrorResponse,
    CreatePlannerPayload
  >({
    mutationFn: (payload) => {
      const formData = new FormData();

      formData.append("semester", payload.semester);
      formData.append("course", payload.course);
      formData.append("feeYearId", String(payload.feeYearId));
      formData.append("files", payload.file as unknown as File);

      return plannerApi.postFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Fee planner created successfully", "success");
      queryClient.invalidateQueries({ queryKey: [FEE_PLANNEER_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong";
      showToast(msg, "error");
    },
  });
};

export default useCreateFeePlanner;
