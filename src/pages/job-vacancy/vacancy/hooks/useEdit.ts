import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { VACANCY_CACHE_KEY } from "../../../../constants";
import type { CreateVacancyPayload, JobVacancy } from "../model/VacancyModel";
import APIClient from "../../../../services/apiClient";

interface EditVacancyPayload extends CreateVacancyPayload {
  id: string;
}

const useEditVacancy = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  if (!appContext) throw new Error("useEditVacancy must be used within AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<JobVacancy>, ApiErrorResponse, EditVacancyPayload>({
    mutationFn: ({ id, ...data }) => {
      const api = new APIClient<JobVacancy>(`/vacancy/${id}`);
      return api.put(data);
    },
    onSuccess: (res) => {
      showToast(res.message || "Vacancy updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [VACANCY_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditVacancy;
