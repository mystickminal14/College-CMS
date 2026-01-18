import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { PLANNEER_CACHE_KEY } from "../../../constants";
import plannerApi from "../services/PlannerService";
import type { CreatePlannerPayload, AcademicPlanner } from "../model/PlannerModel";

const useCreateAcademicPlanner = () => {
  const ctx = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!ctx) {
    throw new Error("useCreateAcademicPlanner must be used within AppContext");
  }

  const { showToast } = ctx;

  return useMutation<
    ApiResponse<AcademicPlanner>,
    ApiErrorResponse,
    CreatePlannerPayload
  >({
    mutationFn: (payload) => {
      const formData = new FormData();

      formData.append("semester", payload.semester);
      formData.append("intake", payload.intake);
      formData.append("plannerCourseId", String(payload.plannerCourseId));
      formData.append("academicYearId", String(payload.academicYearId));
      formData.append("files", payload.file as unknown as File);

      return plannerApi.postFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Academic planner created successfully", "success");
      queryClient.invalidateQueries({ queryKey: [PLANNEER_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong";
      showToast(msg, "error");
    },
  });
};

export default useCreateAcademicPlanner;
