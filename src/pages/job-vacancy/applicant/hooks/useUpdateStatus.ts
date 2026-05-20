import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { APPLICANT_CACHE_KEY } from "../../../../constants";
import type { ApplicationStatus, JobApplication } from "../model/ApplicantModel";
import APIClient from "../../../../services/apiClient";

interface UpdateStatusPayload {
  id: string;
  applicationStatus: ApplicationStatus;
}

const useUpdateApplicantStatus = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  if (!appContext) throw new Error("useUpdateApplicantStatus must be used within AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<JobApplication>, ApiErrorResponse, UpdateStatusPayload>({
    mutationFn: ({ id, applicationStatus }) => {
      // Backend: PUT /vacancy/applications/:appId/status
      const api = new APIClient<JobApplication>(`/vacancy/applications/${id}/status`);
      return api.put({ applicationStatus });
    },
    onSuccess: (res) => {
      showToast(res.message || "Application status updated!", "success");
      queryClient.invalidateQueries({ queryKey: [APPLICANT_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useUpdateApplicantStatus;
