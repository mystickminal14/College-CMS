import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { JOURNAL_ISSUE_CACHE_KEY } from "../../../constants";
import type { CreateChildPayload, Journals } from "../model/JournalModel";
import APIClient from "../../../services/apiClient";

interface UseCreateJournalIssueProps {
  parentId: number;
}

const useCreateJournalIssue = ({ parentId }: UseCreateJournalIssueProps) => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useCreateJournalIssue must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<Journals>,            
    ApiErrorResponse,                 
    CreateChildPayload                 
  >({
    mutationFn: async (payload: CreateChildPayload) => {
      const apiClient = new APIClient<Journals>(`/journal/${parentId}`);
      return apiClient.post(payload);
    },
    onSuccess: (res) => {
      showToast(res.message || "Journal issue created successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [JOURNAL_ISSUE_CACHE_KEY] });
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

export default useCreateJournalIssue;
