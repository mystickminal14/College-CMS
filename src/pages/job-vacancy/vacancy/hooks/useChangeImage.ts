import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { VACANCY_CACHE_KEY } from "../../../../constants";
import type { JobVacancy } from "../model/VacancyModel";
import APIClient from "../../../../services/apiClient";
import { uploadToPcps } from "../../../../services/pcpsClient";

interface ChangeImagePayload {
  id: string;          // existing (Node) backend vacancy id
  phpId?: number;      // PHP backend vacancy id (when known, from the create step)
  image: File;
}

const useChangeVacancyImage = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  if (!appContext) throw new Error("useChangeVacancyImage must be used within AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<JobVacancy>, ApiErrorResponse, ChangeImagePayload>({
    mutationFn: async ({ id, phpId, image }) => {
      // 1. Existing backend.
      const formData = new FormData();
      formData.append("poster", image);
      const api = new APIClient<JobVacancy>(`/vacancy/${id}/image`);
      const nodeRes = await api.putFile(formData);

      // 2. Mirror to PHP (best-effort) — POST /upload/poster stores the file and
      //    writes posterUrl onto pcps_job_vacancies for the PHP id.
      if (phpId !== undefined && phpId !== null) {
        try {
          await uploadToPcps("poster", image, phpId);
        } catch (e) {
          const msg = (e as ApiErrorResponse)?.message || "PHP poster sync failed";
          showToast(`Poster saved, but PHP sync failed: ${msg}`, "error");
        }
      }

      return nodeRes;
    },
    onSuccess: (res) => {
      showToast(res.message || "Poster updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VACANCY_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useChangeVacancyImage;
