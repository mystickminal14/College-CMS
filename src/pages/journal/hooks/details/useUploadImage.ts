import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { JournalDetailsPayload } from "../../model/JournalModel";
import { JOURNAL_DETIALS_CACHE_KEY } from "../../../../constants";
import APIClient from "../../../../services/apiClient";

export interface UpdateJournalImagePayload {
  id: number; // JournalDetails ID
  file: File; // Image to upload
}

const useUploadJournalDetailsImage = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<JournalDetailsPayload>,
    ApiErrorResponse,
    UpdateJournalImagePayload
  >({
    mutationFn: async ({ id, file }) => {
      const formData = new FormData();
      formData.append("image", file);

      const apiClient = new APIClient<JournalDetailsPayload>(
        `/journal/details/image/${id}`
      );
      return apiClient.putFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Image uploaded successfully", "success");
      queryClient.invalidateQueries({ queryKey: [JOURNAL_DETIALS_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Failed to upload image";
      showToast(msg, "error");
    },
  });
};

export const useDeleteJournalDetailsImage = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<JournalDetailsPayload>, ApiErrorResponse, number>({
    mutationFn: async (id) => {
      const apiClient = new APIClient<JournalDetailsPayload>(
        `/journal/details/image/${id}`
      );
      return apiClient.delete();
    },

    onSuccess: (res) => {
      showToast(res.message || "Image removed successfully", "success");
      queryClient.invalidateQueries({ queryKey: [JOURNAL_DETIALS_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Failed to remove image";
      showToast(msg, "error");
    },
  });
};

export default useUploadJournalDetailsImage;
