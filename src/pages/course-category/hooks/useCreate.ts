import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import CourseCategoryApi from "../services/CourseCatService";
import type { CourseCategory } from "../model/CourseCatModel";
import { COURSE_CAT_CACHE_KEY } from "../../../constants";

const useCreateCourseCategory = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreatecourse must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<CourseCategory>, ApiErrorResponse, CourseCategory>({
    mutationFn: (course) => CourseCategoryApi.post(course),

    onSuccess: (res) => {
      showToast(res.message || "Department added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [COURSE_CAT_CACHE_KEY] });
    },

    onError: (err) => {
        let errorMsg='';
      if (err.errors && err.errors.length > 0) {
       errorMsg=err.errors[0].message; 
      } else {
         errorMsg=err.message || "Something went wrong!";
      }
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateCourseCategory;
