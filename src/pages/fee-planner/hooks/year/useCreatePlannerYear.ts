import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { FeeYear, CreateFeeYearPayload } from "../../model/PlannerModel";
import { feeYearApi } from "../../services/PlannerService";
import { PLANNER_YEAR, PLANNER_YEAR_PAG } from "../../../../constants";


const useCreateFeeYear = () => {
  const ctx = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!ctx) throw new Error("useCreateFeeYear must be used within AppContext");

  const { showToast } = ctx;

  return useMutation<
    ApiResponse<FeeYear>,
    ApiErrorResponse,
    CreateFeeYearPayload
  >({
    mutationFn: (payload) => feeYearApi.post(payload),

    onSuccess: (res) => {
      showToast(res.message ?? "Fee year created successfully", "success");
      queryClient.invalidateQueries({ queryKey: [PLANNER_YEAR] });
      queryClient.invalidateQueries({ queryKey: [PLANNER_YEAR_PAG] });

    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong";
      showToast(msg, "error");
    },
  });
};

export default useCreateFeeYear;
