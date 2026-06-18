import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import APIClient from "../../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";

interface CourseRegistrationPayload {
  fullName: string;
  email: string;
  phone: string;
  courseName: string;
  message?: string;
}

const useRegisterCourse = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useRegisterCourse must be used within AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<null>, ApiErrorResponse, CourseRegistrationPayload>({
    mutationFn: (data) => {
      const api = new APIClient<null>("/course-registrations");
      return api.post(data);
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useRegisterCourse;
