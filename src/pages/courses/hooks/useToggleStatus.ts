import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";

const useToggleCourseStatus = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useToggleCourseStatus must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<null>, ApiErrorResponse, number>({
    mutationFn: (id: number) => {
      const apiClient = new APIClient<null>(`/courses/toggle-status/${id}`);
      return apiClient.put({});
    },
    onSuccess: (res) => {
      showToast(res.message || "Course status updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useToggleCourseStatus;