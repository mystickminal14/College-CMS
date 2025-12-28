import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import { JOURNAL_ISSUE_CACHE_KEY } from "../../../constants";
import type { EditChildJournalPayload} from "../model/JournalModel";
import APIClient from "../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";

const useEditChildJournal = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<EditChildJournalPayload>,
    ApiErrorResponse,
    EditChildJournalPayload
  >({
    mutationFn: async ({ id, journal }) => {
      const apiClient = new APIClient<EditChildJournalPayload>(
        `/journal/child/${id}`
      );
      return apiClient.put(journal);
    },
    onSuccess: (res) => {
      showToast(
        res.message || "Journal updated successfully",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: [JOURNAL_ISSUE_CACHE_KEY] });
    },
    onError: (err: any) => {
      showToast(err?.message || "Something went wrong!", "error");
    },
  });
};

export default useEditChildJournal;
