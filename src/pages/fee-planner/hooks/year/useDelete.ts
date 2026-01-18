import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { feeYearApi } from "../../services/PlannerService";
import { FEEPLANNER_YEAR, FEEPLANNER_YEAR_PAG } from "../../../../constants";
import type { FeeYear } from "../../model/PlannerModel";



const useDeleteFeeYear = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useDeleteFeeYear must be used within AppContext");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<FeeYear>, ApiErrorResponse, number>({
    mutationFn: (id) => feeYearApi.delete(id),

    onSuccess: (res) => {
      showToast(res.message || "Fee year deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: [FEEPLANNER_YEAR] });
            queryClient.invalidateQueries({ queryKey: [FEEPLANNER_YEAR_PAG] });
      
    },

    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};

export default useDeleteFeeYear;
