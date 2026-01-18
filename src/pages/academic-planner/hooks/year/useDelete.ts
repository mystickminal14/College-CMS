import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { academicYearApi } from "../../services/PlannerService";
import { PLANNER_YEAR, PLANNER_YEAR_PAG } from "../../../../constants";
import type { AcademicYear } from "../../model/PlannerModel";



const useDeleteAcademicYear = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useDeleteAcademicYear must be used within AppContext");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<AcademicYear>, ApiErrorResponse, number>({
    mutationFn: (id) => academicYearApi.delete(id),

    onSuccess: (res) => {
      showToast(res.message || "Academic year deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: [PLANNER_YEAR] });
            queryClient.invalidateQueries({ queryKey: [PLANNER_YEAR_PAG] });
      
    },

    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};

export default useDeleteAcademicYear;
