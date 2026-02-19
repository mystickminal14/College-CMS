import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";
import type { Courses } from "../model/CourseModel";
import APIClient from "../../../services/apiClient";

const useCopyCourse = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useCopyCourse must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<Courses>, ApiErrorResponse, number|undefined>({
    mutationFn: (course) => {
        
      const apiClient = new APIClient<Courses>(
        `/courses/copy/${encodeURIComponent(course?.toString()??'')}`
      );

      return apiClient.post();
    },

    onSuccess: (res) => {
      showToast(res.message || "Course copied successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY] });
    },

    onError: (err) => {
      let errorMsg = "";
      if (err.errors && err.errors.length > 0) {
        errorMsg = err.errors[0].message;
      } else {
        errorMsg = err.message || "Something went wrong!";
      }
      showToast(errorMsg, "error");
    },
  });
};

export default useCopyCourse;
