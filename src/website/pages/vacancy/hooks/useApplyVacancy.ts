import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { JobApplication } from "../../../../pages/job-vacancy/applicant/model/ApplicantModel";
import ApplicantApi from "../../../../pages/job-vacancy/applicant/services/ApplicantService";

const useApplyVacancy = (vacancyId: string) => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useApplyVacancy must be used within AppContext provider");
  const { showToast } = appContext;

  return useMutation<ApiResponse<JobApplication>, ApiErrorResponse, FormData>({
    mutationFn: (formData) => ApplicantApi.postFile(formData, `${vacancyId}/apply`),
    onSuccess: (res) => {
      showToast(res.message || "Application submitted successfully!", "success");
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to submit application.";
      showToast(msg, "error");
    },
  });
};

export default useApplyVacancy;
