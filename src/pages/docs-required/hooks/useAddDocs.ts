import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOCUMENT_CACHE_KEY } from "../../../constants";
import type { Documents } from "../model/DocsModel";
import documentApi from "../services/DocsService";

const useCreateDocument = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreatedocument must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<Documents>, ApiErrorResponse, Documents>({
    mutationFn: (document) => documentApi.post(document),

    onSuccess: (res) => {
      showToast(res.message || "document added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [DOCUMENT_CACHE_KEY] });
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

export default useCreateDocument;
