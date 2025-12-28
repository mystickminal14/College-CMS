import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import { JOURNAL_DETIALS_CACHE_KEY } from "../../../../constants";
import  {  journalDetails } from "../../services/JournalService";
type DeletePayload = {
  id: number;        
  type: "PARENT" | "CHILD";
};

const useDeleteJournalDetails = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeletePayload) => {
      
        return journalDetails.delete(id); 
      
    },
    onSuccess: (res) => {
      showToast(res.message, "success");
      queryClient.invalidateQueries({ queryKey: [JOURNAL_DETIALS_CACHE_KEY    ] });
    },
    onError: (err: any) => {
      showToast(err.message || "Failed to delete", "error");
    },
  });
};

export default useDeleteJournalDetails;
