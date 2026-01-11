import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { PlannerCourse } from "../model/PlannerCourse";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import plannercourseApi from "../services/PlannerCourseService";
import { PLANNER_COURSE_CACHE_KEY } from "../../../constants";


const useCreatePlannerCourse = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreatePlannerCourse must be used within AppContext provider");
  }
  const { showToast } = appContext;

  return useMutation<ApiResponse<PlannerCourse>, ApiErrorResponse, PlannerCourse>({
    mutationFn: (plannercourse) => plannercourseApi.post(plannercourse),

    onSuccess: (res) => {
      showToast(res.message || "Planner Course added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [PLANNER_COURSE_CACHE_KEY] });
       

    },

    onError: (err) => {
        let errorMsg='';
      if (err.errors && err.errors.length > 0) {
       errorMsg=err.errors[0].message; // show first validation error
      } else {
         errorMsg=err.message || "Something went wrong!";
      }
      showToast(errorMsg, "error");
    },
  });
};

export default useCreatePlannerCourse;
