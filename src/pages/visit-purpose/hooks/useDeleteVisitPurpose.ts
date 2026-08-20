import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import VisitPurposeApi from "../services/VisitPurposeService";
import type { VisitPurpose } from "../model/VisitPurposeModel";
import {
  VISIT_PURPOSE_CACHE_KEY,
  VISIT_PURPOSE_NAME_CACHE_KEY,
} from "../../../constants";

const useDeleteVisitPurpose = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteVisitPurpose must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<VisitPurpose>, ApiErrorResponse, number>({
    mutationFn: (id) => VisitPurposeApi.delete(id),
    onSuccess: (res) => {
      showToast(res.message || "Purpose deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VISIT_PURPOSE_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISIT_PURPOSE_NAME_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteVisitPurpose;
