import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import { JOURNAL_CACHE_KEY } from "../../../constants";
import type { EditParentJournalPayload, } from "../model/JournalModel";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

const useEditParentJournal = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<EditParentJournalPayload>,
    ApiErrorResponse,
    EditParentJournalPayload
  >({
    mutationFn: async ({ id, journal }) => {
      const apiClient = new APIClient<EditParentJournalPayload>(
        `/journal/${id}`
      );
      return apiClient.put(journal);
    },
    onSuccess: (res) => {
      showToast(
        res.message || "Parent journal updated successfully",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: [JOURNAL_CACHE_KEY] });
    },
    onError: (err: any) => {
      showToast(err?.message || "Something went wrong!", "error");
    },
  });
};

export default useEditParentJournal;
