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

const useCreateVisitPurpose = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useCreateVisitPurpose must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<VisitPurpose>, ApiErrorResponse, VisitPurpose>({
    mutationFn: (purpose) => VisitPurposeApi.post(purpose),

    onSuccess: (res) => {
      showToast(res.message || "Purpose added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VISIT_PURPOSE_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISIT_PURPOSE_NAME_CACHE_KEY] });
    },

    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateVisitPurpose;
