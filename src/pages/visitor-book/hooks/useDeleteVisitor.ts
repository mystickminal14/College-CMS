import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import VisitorApi from "../services/VisitorService";
import type { Visitor } from "../model/VisitorModel";
import { VISITOR_CACHE_KEY, VISITOR_TODAY_CACHE_KEY } from "../../../constants";

const useDeleteVisitor = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteVisitor must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<Visitor>, ApiErrorResponse, number>({
    mutationFn: (id) => VisitorApi.delete(id),
    onSuccess: (res) => {
      showToast(res.message || "Visitor deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VISITOR_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISITOR_TODAY_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteVisitor;
