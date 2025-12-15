import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Holidays, HolidayType } from "../model/HolidayModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { HOLIDAY_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";
import { compressImage, validateImageFile } from "../../../utils/ImageCompression";

interface CreateimagePayload {
  image: File;
  type: HolidayType;
}

export const useUpdateimage = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useUpdateimage must be used within AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Holidays>, ApiErrorResponse, CreateimagePayload>({
    mutationFn: async ({ image, type }) => {
      const validationError = validateImageFile(image);
      if (validationError) throw new Error(validationError);

      const compressedImage = await compressImage(image);

      const formData = new FormData();
      formData.append("image", compressedImage);

      formData.append("type", type);

      // Only POST — because backend only supports CREATE
      const apiClient = new APIClient<Holidays>("/holiday");
      return apiClient.postFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Download uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [HOLIDAY_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};
