import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { VACANCY_CACHE_KEY } from "../../../../constants";
import type { JobVacancy } from "../model/VacancyModel";
import APIClient from "../../../../services/apiClient";

const useToggleVacancyStatus = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  if (!appContext) throw new Error("useToggleVacancyStatus must be used within AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<JobVacancy>, ApiErrorResponse, { id: string }>({
    mutationFn: ({ id }) => {
      const api = new APIClient<JobVacancy>(`/vacancy/${id}/status`);
      return api.put({});
    },
    onSuccess: (res) => {
      showToast(res.message || "Status updated!", "success");
      queryClient.invalidateQueries({ queryKey: [VACANCY_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useToggleVacancyStatus;
