import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { JournalDetailsPayload } from "../../model/JournalModel";
import { JOURNAL_DETIALS_CACHE_KEY } from "../../../../constants";
import APIClient from "../../../../services/apiClient";

export interface UpdateJournalFilePayload {
  id: number;           // JournalDetails ID
  file: File;           // File to upload
}

const useUpdateJournalDetailsFile = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<JournalDetailsPayload>,
    ApiErrorResponse,
    UpdateJournalFilePayload
  >({
    mutationFn: async ({ id, file }) => {
      const formData = new FormData();
      formData.append("files", file);
  
      const apiClient = new APIClient<JournalDetailsPayload>(`/journal/details/file/${id}`);
      return apiClient.putFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "File updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: [JOURNAL_DETIALS_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message ||
        err.message ||
        "Failed to update file";
      showToast(msg, "error");
    },
  });
};

export default useUpdateJournalDetailsFile;
