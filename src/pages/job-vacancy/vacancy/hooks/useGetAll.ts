import { useQuery } from "@tanstack/react-query";
import { VACANCY_CACHE_KEY } from "../../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { JobStatus, JobVacancy } from "../model/VacancyModel";
import VacancyApi from "../services/VacancyService";

interface VacancyQueryProps {
  page?: number;
  limit?: number;
  search?: string;
  status?: JobStatus | "";
}

const useGetVacancies = ({ page = 1, limit = 10, search = "", status = "" }: VacancyQueryProps) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  if (search) params.append("search", search);
  if (status) params.append("status", status);

  return useQuery<ApiResponse<JobVacancy[]>, ApiErrorResponse>({
    queryKey: [VACANCY_CACHE_KEY, page, limit, search, status],
    queryFn: () => VacancyApi.getAll(`?${params.toString()}`),
  });
};

export default useGetVacancies;
