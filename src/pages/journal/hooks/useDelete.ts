import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import {  JOURNAL_CACHE_KEY, } from "../../../constants";
import journalApi from "../services/JournalService";
type DeletePayload = {
  id: number;        
};

const useDeleteJournal = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, }: DeletePayload) => {
        return journalApi.delete(id); 
    },
    onSuccess: (res) => {
      showToast(res.message, "success");
      queryClient.invalidateQueries({ queryKey: [JOURNAL_CACHE_KEY] });
      
    },
    onError: (err: any) => {
      showToast(err.message || "Failed to delete", "error");
    },
  });
};

export default useDeleteJournal;
