import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { AppContext } from "../../../context/ContextApp";
import plannerApi from "../services/PlannerService";
import { FEE_PLANNEER_CACHE_KEY } from "../../../constants";
import type { FeePlanner,  } from "../model/PlannerModel";

const useDeleteFeePlanner = () => {
  const ctx = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!ctx) {
    throw new Error("useDeleteFeePlanner must be used within AppContext");
  }

  const { showToast } = ctx;

  return useMutation<ApiResponse<FeePlanner>, ApiErrorResponse, number>({
    mutationFn: (id) => plannerApi.delete(id),

    onSuccess: (res) => {
      showToast(res.message || "Fee planner deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: [FEE_PLANNEER_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong";
      showToast(msg, "error");
    },
  });
};

export default useDeleteFeePlanner;
