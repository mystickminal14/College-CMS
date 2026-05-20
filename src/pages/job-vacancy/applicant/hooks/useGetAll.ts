import { useQuery } from "@tanstack/react-query";
import { APPLICANT_CACHE_KEY } from "../../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import type { JobApplication } from "../model/ApplicantModel";
import APIClient from "../../../../services/apiClient";

interface ApplicantQueryProps {
  vacancyId: string;
  page?: number;
  limit?: number;
  search?: string;
}

const useGetApplicants = ({ vacancyId, page = 1, limit = 10, search = "" }: ApplicantQueryProps) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  if (search) params.append("search", search);

  return useQuery<ApiResponse<JobApplication[]>, ApiErrorResponse>({
    queryKey: [APPLICANT_CACHE_KEY, vacancyId, page, limit, search],
    queryFn: () => {
      const api = new APIClient<JobApplication>(`/vacancy/${vacancyId}/applications`);
      return api.getAll(`?${params.toString()}`);
    },
    enabled: !!vacancyId,
  });
};

export default useGetApplicants;
