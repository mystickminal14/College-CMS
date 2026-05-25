import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { VACANCY_CACHE_KEY } from "../../../../constants";
import type { CreateVacancyPayload, JobVacancy } from "../model/VacancyModel";
import VacancyApi from "../services/VacancyService";
import pcpsAxios, { type PcpsCreateResponse } from "../../../../services/pcpsClient";

const useCreateVacancy = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  if (!appContext) throw new Error("useCreateVacancy must be used within AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<JobVacancy>, ApiErrorResponse, CreateVacancyPayload>({
    mutationFn: async (payload) => {
      // 1. Existing backend — source of truth for the UI flow.
      const nodeRes = await VacancyApi.post(payload);

      // 2. Mirror to the PHP backend (best-effort; never blocks the existing flow).
      let phpId: number | undefined;
      try {
        const php = await pcpsAxios.post<PcpsCreateResponse>("/job_vacancy", payload);
        phpId = php.data.id;
      } catch (e) {
        const msg = (e as ApiErrorResponse)?.message || "PHP sync failed";
        showToast(`Vacancy saved, but PHP sync failed: ${msg}`, "error");
      }

      // Carry the PHP id alongside the existing response so the poster step can
      // attach the image on both backends.
      return {
        ...nodeRes,
        data: { ...(nodeRes.data ?? {}), phpId } as unknown as JobVacancy,
      };
    },
    onSuccess: (res) => {
      showToast(res.message || "Vacancy created successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VACANCY_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useCreateVacancy;
