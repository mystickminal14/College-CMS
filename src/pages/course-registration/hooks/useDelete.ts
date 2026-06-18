import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_REGISTRATION_CACHE_KEY } from "../../../constants";
import type { CourseRegistration } from "../model/CourseRegistrationModel";
import APIClient from "../../../services/apiClient";

const useDeleteCourseRegistration = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  if (!appContext) throw new Error("useDeleteCourseRegistration must be used within AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<CourseRegistration>, ApiErrorResponse, { id: number }>({
    mutationFn: ({ id }) => {
      const api = new APIClient<CourseRegistration>(`/course-registrations/${id}`);
      return api.delete();
    },
    onSuccess: (res) => {
      showToast(res.message || "Registration deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [COURSE_REGISTRATION_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteCourseRegistration;
