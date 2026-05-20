import { useQuery } from "@tanstack/react-query";
import { VACANCY_CACHE_KEY } from "../../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { JobVacancy } from "../../../../pages/job-vacancy/vacancy/model/VacancyModel";
import VacancyApi from "../../../../pages/job-vacancy/vacancy/services/VacancyService";

const useGetVacancyById = (id: string) => {
  return useQuery<ApiResponse<JobVacancy>, ApiErrorResponse>({
    queryKey: [VACANCY_CACHE_KEY, id],
    queryFn: () => VacancyApi.get(id),
    enabled: !!id,
  });
};

export default useGetVacancyById;
