import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { APPLICANT_CACHE_KEY } from "../../../../constants";
import type { JobApplication } from "../model/ApplicantModel";
import APIClient from "../../../../services/apiClient";

const useDeleteApplicant = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  if (!appContext) throw new Error("useDeleteApplicant must be used within AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<JobApplication>, ApiErrorResponse, { id: string }>({
    mutationFn: ({ id }) => {
      const api = new APIClient<JobApplication>(`/vacancy/applications/${id}`);
      return api.delete();
    },
    onSuccess: (res) => {
      showToast(res.message || "Application deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [APPLICANT_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteApplicant;
