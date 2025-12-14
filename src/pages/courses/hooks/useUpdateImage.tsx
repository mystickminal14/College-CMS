import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { COURSE_CACHE_KEY } from "../../../constants";
import type { Courses } from "../model/CourseModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";

export const useUpdateImage = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useUploadNewsImage must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<Courses>, ApiErrorResponse, { id: number; image: File }>({
    mutationFn: async ({ id, image }) => {
      const validationError = validateImageFile(image);
      if (validationError) throw new Error(validationError);
      
      const compressedImage = await compressImage(image);
      
      const formData = new FormData();
      formData.append("image", compressedImage);

      const apiClient = new APIClient<Courses>(`/courses/update-image/${id}`);
      return apiClient.postImage(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "News image uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [COURSE_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

