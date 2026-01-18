import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type {
  ApiErrorResponse,
  ApiResponse,
} from "../../../../services/apiTypes";
import type {
  FeeYear,
  UpdateFeeYearPayload,
} from "../../model/PlannerModel";
import { FEEPLANNER_YEAR, FEEPLANNER_YEAR_PAG } from "../../../../constants";
import APIClient from "../../../../services/apiClient";

const useUpdateFeeYear = () => {
  const ctx = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!ctx) {
    throw new Error("useUpdateFeeYear must be used within AppContext");
  }

  const { showToast } = ctx;

  return useMutation<
    ApiResponse<FeeYear>,
    ApiErrorResponse,
    UpdateFeeYearPayload
  >({
    mutationFn: ({ id, ...payload }) => {
      const apiClient = new APIClient<FeeYear>(
        `/fee-planner/fee_year/${encodeURIComponent(id)}`,
      );

      return apiClient.put(payload);
    },

    onSuccess: (res) => {
      showToast(res.message ?? "Fee year updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: [FEEPLANNER_YEAR] });
      queryClient.invalidateQueries({ queryKey: [FEEPLANNER_YEAR_PAG] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong";
      showToast(msg, "error");
    },
  });
};

export default useUpdateFeeYear;
