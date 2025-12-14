// hooks/useUpdateCourseBlock.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { UpdateBlockData } from "../model/CourseDetailModel";

const useUpdateCourseBlock = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useUpdateCourseBlock must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<UpdateBlockData>, ApiErrorResponse, UpdateBlockData>({
    mutationFn: async (payload) => {
      const { id, ...data } = payload;
      const apiClient = new APIClient<UpdateBlockData>(`/courses/${id}/details`);
      return apiClient.put(data);
    },

    onSuccess: (res) => {
      showToast(res.message || "Block updated successfully!", "success");
      
      // Invalidate the course details query
      queryClient.invalidateQueries({ 
        queryKey: ["courses", "details"] 
      });
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

export default useUpdateCourseBlock;