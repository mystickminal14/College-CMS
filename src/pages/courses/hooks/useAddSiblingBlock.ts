// hooks/useAddCourseBlock.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { COURSE_CACHE_KEY } from "../../../constants";
import type { BlockType, ContentCategory } from "../model/CourseDetailModel";

export interface AddBlockPayload {
  courseId: number;
  parentId?: number | null;
  type: BlockType;
  category:ContentCategory;
  title?: string;
  content?: string | string[];
}

const useAddCourseBlock = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useAddCourseBlock must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<any>, ApiErrorResponse, AddBlockPayload>({
    mutationFn: async ({ courseId, ...data }) => {
      const apiClient = new APIClient(`/courses/${courseId}/blocks`);
      return apiClient.post(data);
    },

    onSuccess: (res) => {
      showToast(res.message || "Block added successfully!", "success");
      queryClient.invalidateQueries({
        queryKey: [COURSE_CACHE_KEY, "details"],
        refetchType: "all",
      });
     queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY],   refetchType: 'all' });

    },

    onError: (err) => {
      showToast(
        err.errors?.[0]?.message || err.message || "Something went wrong!",
        "error"
      );
    },
  });
};

export default useAddCourseBlock;
