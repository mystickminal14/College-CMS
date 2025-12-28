import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { EDITORIAL_CACHE_KEY } from "../../../constants";
import type { EditorialMember } from "../model/EditoralModel";
import EditorialApi from "../services/EditorialService";

const useEditEditorial = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useEditEditorial must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<EditorialMember>, ApiErrorResponse, EditorialMember>({
    mutationFn: (payload) => {
      if (!payload.id) throw new Error("Editorial member ID is required");
      const { id, ...updateData } = payload;
      return EditorialApi.put(updateData, `${encodeURIComponent(id)}`);
    },
    onSuccess: (res) => {
      showToast(res.message || "Editorial member updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [EDITORIAL_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditEditorial;
