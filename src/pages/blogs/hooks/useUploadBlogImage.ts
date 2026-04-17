import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { Blog } from "../model/BlogsModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { BLOG_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";

export const useUploadBlogImage = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useUploadBlogImage must be used within AppContext provider");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Blog>, ApiErrorResponse, { id: number; image: File; isUpdate?: boolean }>({
    mutationFn: async ({ id, image, isUpdate = false }) => {
      const validationError = validateImageFile(image);
      if (validationError) throw new Error(validationError);

      const compressedImage = await compressImage(image);
      const formData = new FormData();
      formData.append("image", compressedImage);

      const apiClient = new APIClient<Blog>(`/blogs/${id}/image`);

      return isUpdate ? apiClient.putFile(formData) : apiClient.postFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Blog image uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [BLOG_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};