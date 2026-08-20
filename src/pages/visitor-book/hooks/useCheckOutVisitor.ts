import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { Visitor } from "../model/VisitorModel";
import { VISITOR_CACHE_KEY, VISITOR_TODAY_CACHE_KEY } from "../../../constants";

const useCheckOutVisitor = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useCheckOutVisitor must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<Visitor>, ApiErrorResponse, number>({
    mutationFn: (id) => {
      const apiClient = new APIClient<Visitor>(`/visitor/check-out/${id}`);
      return apiClient.put({});
    },
    onSuccess: (res) => {
      showToast(res.message || "Visitor checked out successfully!", "success");
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

export default useCheckOutVisitor;
