import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import {  JOURNAL_CACHE_KEY, JOURNAL_ISSUE_CACHE_KEY } from "../../../constants";
import journalApi, { journalChildApi } from "../services/JournalService";
type DeletePayload = {
  id: number;        
  type: "PARENT" | "CHILD";
};

const useDeleteJournal = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: DeletePayload) => {
      if (type === "PARENT") {
        return journalApi.delete(id); 
      } else {
        return journalChildApi.delete(id);
      }
    },
    onSuccess: (res) => {
      showToast(res.message, "success");
      queryClient.invalidateQueries({ queryKey: [JOURNAL_CACHE_KEY] });
            queryClient.invalidateQueries({ queryKey: [JOURNAL_ISSUE_CACHE_KEY] });
      
    },
    onError: (err: any) => {
      showToast(err.message || "Failed to delete", "error");
    },
  });
};

export default useDeleteJournal;
