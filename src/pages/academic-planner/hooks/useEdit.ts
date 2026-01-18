import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { AppContext } from "../../../context/ContextApp";
import type {
  EditPlannerPayload,
  AcademicPlanner,
} from "../model/PlannerModel";
import { PLANNEER_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";

const useUpdateAcademicPlanner = () => {
  const ctx = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!ctx) {
    throw new Error("useUpdateAcademicPlanner must be used within AppContext");
  }

  const { showToast } = ctx;

  return useMutation<
    ApiResponse<AcademicPlanner>,
    ApiErrorResponse,
    Partial<EditPlannerPayload>
  >({
    mutationFn: (payload) => {
      const formData = new FormData();

      if (payload.semester) formData.append("semester", payload.semester);
      if (payload.intake) formData.append("intake", payload.intake);
      if (payload.plannerCourseId)
        formData.append("plannerCourseId", String(payload.plannerCourseId));
      if (payload.academicYearId)
        formData.append("academicYearId", String(payload.academicYearId));
      if (payload.file)
        formData.append("files", payload.file as unknown as File);
      const ids = Number(payload.id);
      const apiClient = new APIClient<AcademicPlanner>(
        `/planner/${encodeURIComponent(ids)}`,
      );

      return apiClient.putFile(formData);
    },

    onSuccess: (res) => {
      showToast(
        res.message || "Academic planner updated successfully",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: [PLANNEER_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong";
      showToast(msg, "error");
    },
  });
};

export default useUpdateAcademicPlanner;
