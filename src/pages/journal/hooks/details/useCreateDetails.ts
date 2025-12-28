import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { JournalDetailsPayload } from "../../model/JournalModel";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import APIClient from "../../../../services/apiClient";
import { JOURNAL_DETIALS_CACHE_KEY } from "../../../../constants";

interface UseCreateJournalDetailsProps {
  parentId: number;
}

const useCreateJournalDetails = ({ parentId }: UseCreateJournalDetailsProps) => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useCreateJournalDetails must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<JournalDetailsPayload>,            
    ApiErrorResponse,                 
    JournalDetailsPayload                 
  >({
    mutationFn: async (payload: JournalDetailsPayload) => {
      const apiClient = new APIClient<JournalDetailsPayload>(`/journal/details/${parentId}`);
      return apiClient.post(payload);
    },
    onSuccess: (res) => {
      showToast(res.message || "Journal details created successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [JOURNAL_DETIALS_CACHE_KEY] });
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

export default useCreateJournalDetails;
