import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {  JOURNAL_CACHE_KEY } from "../../../constants";
import type { CreateParentPayload } from "../model/JournalModel";
import journalApi from "../services/JournalService";

const useCreateParent = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateIntakes must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<CreateParentPayload>, ApiErrorResponse, CreateParentPayload>({
    mutationFn: (CreateParentPayload) => journalApi.post(CreateParentPayload),
    onSuccess: (res) => {
      showToast(res.message || "Journal added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [JOURNAL_CACHE_KEY] });
    },
    onError: (err) => {
        let errorMsg='';
      if (err.errors && err.errors.length > 0) {
       errorMsg=err.errors[0].message; 
      } else {
         errorMsg=err.message || "Something went wrong!";
      }
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateParent;
