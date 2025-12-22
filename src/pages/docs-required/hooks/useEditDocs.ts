import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOCUMENT_CACHE_KEY } from "../../../constants";
import type { Documents } from "../model/DocsModel";


const useEditDocuments = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditDocuments must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<Documents>,      
    ApiErrorResponse,
    Partial<Documents> & { id: number } 
  >({
    mutationFn: (payload) => {
      const { id, ...updateData } = payload;

      const apiClient = new APIClient<Documents>(
        `/docs/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Document updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [DOCUMENT_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditDocuments;
