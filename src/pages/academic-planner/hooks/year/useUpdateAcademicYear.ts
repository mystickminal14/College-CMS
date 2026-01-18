import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type {
  ApiErrorResponse,
  ApiResponse,
} from "../../../../services/apiTypes";
import type {
  AcademicYear,
  UpdateAcademicYearPayload,
} from "../../model/PlannerModel";
import { PLANNER_YEAR, PLANNER_YEAR_PAG } from "../../../../constants";
import APIClient from "../../../../services/apiClient";

const useUpdateAcademicYear = () => {
  const ctx = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!ctx) {
    throw new Error("useUpdateAcademicYear must be used within AppContext");
  }

  const { showToast } = ctx;

  return useMutation<
    ApiResponse<AcademicYear>,
    ApiErrorResponse,
    UpdateAcademicYearPayload
  >({
    mutationFn: ({ id, ...payload }) => {
      const apiClient = new APIClient<AcademicYear>(
        `/planner/academic_year/${encodeURIComponent(id)}`,
      );

      return apiClient.put(payload);
    },

    onSuccess: (res) => {
      showToast(res.message ?? "Academic year updated successfully", "success");
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

export default useUpdateAcademicYear;
