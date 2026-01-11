import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { PlannerCourse } from "../model/PlannerCourse";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { AppContext } from "../../../context/ContextApp";
import { PLANNER_COURSE_CACHE_KEY } from "../../../constants";

const useEditPlannerCourse = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useEditPlannerCourse must be used inside AppContext");
  const { showToast } = appContext;

 return useMutation<ApiResponse<PlannerCourse>, ApiErrorResponse, Partial<PlannerCourse>>({
  mutationFn: (payload: Partial<PlannerCourse>) => {
    if (!payload.id) throw new Error("PlannerCourse ID is required");

    const { id, ...updateData } = payload;
    const apiClient = new APIClient<Partial<PlannerCourse>>(`/planner-course/${encodeURIComponent(id)}`);

    return apiClient.put(updateData); 
  },
  onSuccess: (res) => {
    showToast(res.message || "PlannerCourse updated successfully!", "success");
    queryClient.invalidateQueries({ queryKey: [PLANNER_COURSE_CACHE_KEY] });
  },
  onError: (err) => {
    const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
    showToast(msg, "error");
  },
});

};

export default useEditPlannerCourse;
