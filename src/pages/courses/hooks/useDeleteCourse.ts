import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Courses } from "../model/CourseModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";
import courseApi from "../services/CourseService";

const useDeleteCourses = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteCourses must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Courses>, ApiErrorResponse, Partial<Courses>>({
    mutationFn: (payload: Partial<Courses>) => {
      if (!payload.id) throw new Error("Course ID is required");
      return courseApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Course Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteCourses;
