import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { CourseDetailBlock } from "../model/CourseDetailModel";
import { COURSE_CACHE_KEY } from "../../../constants";

interface AddCourseDetailsPayload {
  courseId: number;
  blocks: CourseDetailBlock[];
}

const useAddCourseDetails = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error(
      "useAddCourseDetails must be used within AppContext provider"
    );
  }

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<CourseDetailBlock[]>,
    ApiErrorResponse,
    AddCourseDetailsPayload
  >({
    mutationFn: async ({ courseId, blocks }) => {
      // Directly create APIClient for CourseDetailBlock[]
      const apiClient = new APIClient<CourseDetailBlock[]>(`/courses/${courseId}/details`);

      // POST the blocks
      const response = await apiClient.post(blocks);
      return response;
    },

    onSuccess: (res) => {
         showToast(res.message || "Course updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY,"details"] });
      
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

export default useAddCourseDetails;
