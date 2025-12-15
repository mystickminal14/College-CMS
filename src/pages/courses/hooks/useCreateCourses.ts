import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";
import courseApi from "../services/CourseService";
import type { Courses } from "../model/CourseModel";

const useCreateCourse = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreatecourse must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<Courses>, ApiErrorResponse, Courses>({
    mutationFn: (course) => courseApi.post(course),

    onSuccess: (res) => {
      showToast(res.message || "course added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY] });
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

export default useCreateCourse;
