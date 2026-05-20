import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { VACANCY_CACHE_KEY } from "../../../../constants";
import type { JobVacancy } from "../model/VacancyModel";
import APIClient from "../../../../services/apiClient";

interface ChangeImagePayload {
  id: string;
  image: File;
}

const useChangeVacancyImage = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  if (!appContext) throw new Error("useChangeVacancyImage must be used within AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<JobVacancy>, ApiErrorResponse, ChangeImagePayload>({
    mutationFn: ({ id, image }) => {
      const formData = new FormData();
      formData.append("poster", image);
      const api = new APIClient<JobVacancy>(`/vacancy/${id}/image`);
      return api.putFile(formData);
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
