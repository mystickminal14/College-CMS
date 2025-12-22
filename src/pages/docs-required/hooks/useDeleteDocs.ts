import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOCUMENT_CACHE_KEY } from "../../../constants";
import type { Documents } from "../model/DocsModel";
import documentApi from "../services/DocsService";

const useDeleteDocuments = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteDocuments must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Documents>, ApiErrorResponse, Partial<Documents>>({
    mutationFn: (payload: Partial<Documents>) => {
      if (!payload.id) throw new Error("Document ID is required");
      return documentApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Document Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [DOCUMENT_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteDocuments;
