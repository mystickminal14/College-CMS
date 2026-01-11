import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { PlannerCourse } from "../model/PlannerCourse";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { PLANNER_COURSE_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";

const apiClient = new APIClient<PlannerCourse>("/planner-course");

const useDeletePlannerCourse = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeletePlannerCourse must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<PlannerCourse>, ApiErrorResponse, Partial<PlannerCourse>>({
    mutationFn: (payload: Partial<PlannerCourse>) => {
      if (!payload.id) throw new Error("Planner Course ID is required");
      return apiClient.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Planner Course Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [PLANNER_COURSE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeletePlannerCourse;
