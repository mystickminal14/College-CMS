// pages/journals/hooks/useEditJournalDetails.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import APIClient from "../../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type {
  JournalDetailsPayload,
  EditJournalDetailsPayload,
} from "../../model/JournalModel";
import { JOURNAL_DETIALS_CACHE_KEY } from "../../../../constants";

const useEditJournalDetails = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<JournalDetailsPayload>,
    ApiErrorResponse,
    EditJournalDetailsPayload
  >({
    mutationFn: async ({ id, journal }) => {
      const apiClient = new APIClient<JournalDetailsPayload>(
        `/journal/details/${id}`
      );
      return apiClient.put(journal);
    },

    onSuccess: (res) => {
      showToast(
        res?.message || "Journal details updated successfully",
        "success"
      );
      queryClient.invalidateQueries({
        queryKey: [JOURNAL_DETIALS_CACHE_KEY],
      });
    },

    onError: (err: any) => {
      showToast(err?.message || "Something went wrong!", "error");
    },
  });
};

export default useEditJournalDetails;
