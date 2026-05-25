import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { JobApplication } from "../../../../pages/job-vacancy/applicant/model/ApplicantModel";
import ApplicantApi from "../../../../pages/job-vacancy/applicant/services/ApplicantService";
import pcpsAxios, { type PcpsCreateResponse, uploadToPcps } from "../../../../services/pcpsClient";

const useApplyVacancy = (vacancyId: string) => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useApplyVacancy must be used within AppContext provider");
  const { showToast } = appContext;

  return useMutation<ApiResponse<JobApplication>, ApiErrorResponse, FormData>({
    mutationFn: async (formData) => {
      // 1. Existing backend (multipart with the resume file) — source of truth.
      const nodeRes = await ApplicantApi.postFile(formData, `${vacancyId}/apply`);

      // 2. Mirror to PHP (best-effort): upload the resume, then create the application.
      try {
        let resumeUrl: string | undefined;
        const resume = formData.get("resume");
        if (resume instanceof File && resume.size > 0) {
          const up = await uploadToPcps("resume", resume);
          resumeUrl = up.url;
        }

        const payload: Record<string, unknown> = {
          vacancyId,
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          dateOfBirth: formData.get("dateOfBirth"),
          gender: formData.get("gender"),
          nationality: formData.get("nationality"),
          highestQualification: formData.get("highestQualification"),
          maritalStatus: formData.get("maritalStatus"),
          currentAddress: formData.get("currentAddress"),
          contactNumber: formData.get("contactNumber"),
          heardFrom: formData.get("heardFrom"),
        };
        const heardFromOther = formData.get("heardFromOther");
        if (heardFromOther) payload.heardFromOther = heardFromOther;
        if (resumeUrl) payload.resumeUrl = resumeUrl;

        await pcpsAxios.post<PcpsCreateResponse>("/job_application", payload);
      } catch (e) {
        const msg = (e as ApiErrorResponse)?.message || "PHP sync failed";
        showToast(`Application submitted, but PHP sync failed: ${msg}`, "error");
      }

      return nodeRes;
    },
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
