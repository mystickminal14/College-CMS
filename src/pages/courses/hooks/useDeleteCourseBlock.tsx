// hooks/useDeleteCourseBlock.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";

interface DeleteCourseBlockPayload {
  id: number;
}

const useDeleteCourseBlock = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useDeleteCourseBlock must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<null>, ApiErrorResponse, DeleteCourseBlockPayload>({
    mutationFn: async ({ id }) => {
      const apiClient = new APIClient<null>(`/courses/${id}/details`);
      return apiClient.delete();
    },

    onSuccess: (res) => {
      showToast(res.message || "Block deleted successfully!", "success");
      
      // Invalidate the course details query
                queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY, 'details'],   refetchType: 'all' });

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

export default useDeleteCourseBlock;