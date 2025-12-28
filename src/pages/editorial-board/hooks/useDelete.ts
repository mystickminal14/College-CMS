import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { EDITORIAL_CACHE_KEY } from "../../../constants";
import type { EditorialMember } from "../model/EditoralModel";
import EditorialApi from "../services/EditorialService";

const useDeleteEditorial = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useDeleteEditorial must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<EditorialMember>, ApiErrorResponse, Partial<EditorialMember>>({
    mutationFn: (payload) => {
      if (!payload.id) throw new Error("Editorial member ID is required");
      return EditorialApi.delete(`${encodeURIComponent(payload.id)}`);
    },
    onSuccess: (res) => {
      showToast(res.message || "Editorial member deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [EDITORIAL_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteEditorial;
