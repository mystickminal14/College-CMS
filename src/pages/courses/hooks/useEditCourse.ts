import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";

import type { Courses } from "../model/CourseModel";

const useEditCourses = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditCourses must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<Courses>,        // ✅ response type
    ApiErrorResponse,
    Partial<Courses> & { id: number } // ✅ payload must include id
  >({
    mutationFn: (payload) => {
      const { id, ...updateData } = payload;

      const apiClient = new APIClient<Courses>(
        `/courses/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Course updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditCourses;
