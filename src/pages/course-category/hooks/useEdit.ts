import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CAT_CACHE_KEY } from "../../../constants";
import type {  CourseCategory,} from "../model/CourseCatModel";
const useEditCourseCategory = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditCourses must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<CourseCategory>,        // ✅ response type
    ApiErrorResponse,
    Partial<CourseCategory> & { id: number } // ✅ payload must include id
  >({
    mutationFn: (payload) => {
      const { id, ...updateData } = payload;

      const apiClient = new APIClient<CourseCategory>(
        `/course-categories/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Course Category updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [COURSE_CAT_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditCourseCategory;
export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<ApiResponse<CourseCategory>, ApiErrorResponse, { id: number; status: "ENABLED" | "DISABLED" }>({
    mutationFn: ({ id, status }) => {
      if (!id) throw new Error("Scholarship ID is required for status change");
      const apiClient = new APIClient<CourseCategory>(
        `/course-categories/toggle-status/${encodeURIComponent(id)}`
      );

      return apiClient.put(  {id, status });
    },
    onSuccess: (res) => {
      showToast(res.message || "Status changed successfully!", "success");
       queryClient.invalidateQueries({ queryKey: [COURSE_CAT_CACHE_KEY] });

    },
    onError: (err) => {
      const errorMsg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};
