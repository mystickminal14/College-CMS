import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import VisitorApi from "../services/VisitorService";
import type { Visitor } from "../model/VisitorModel";
import { VISITOR_CACHE_KEY, VISITOR_TODAY_CACHE_KEY } from "../../../constants";

const useCreateVisitor = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useCreateVisitor must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<Visitor>, ApiErrorResponse, Visitor>({
    mutationFn: (visitor) => VisitorApi.post(visitor),

    onSuccess: (res) => {
      showToast(res.message || "Visitor registered successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VISITOR_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISITOR_TODAY_CACHE_KEY] });
    },

    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateVisitor;
