import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { EDITORIAL_CACHE_KEY } from "../../../constants";
import type { EditorialMember } from "../model/EditoralModel";
import EditorialApi from "../services/EditorialService";

const useCreateEditorial = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  if (!appContext) throw new Error("useCreateEditorial must be used within AppContext provider");

  const { showToast } = appContext;

  return useMutation<ApiResponse<EditorialMember>, ApiErrorResponse, EditorialMember>({
    mutationFn: (payload) => EditorialApi.post(payload),
    onSuccess: (res) => {
      showToast(res.message || "Editorial member added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [EDITORIAL_CACHE_KEY] });
    },
    onError: (err) => {
      let errorMsg = '';
      if (err.errors && err.errors.length > 0) errorMsg = err.errors[0].message;
      else errorMsg = err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateEditorial;
