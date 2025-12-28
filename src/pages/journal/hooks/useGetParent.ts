import { useQuery } from "@tanstack/react-query";
import {  JOURNAL_CACHE_KEY } from "../../../constants";
import type { Journals } from "../model/JournalModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import journalApi from "../services/JournalService";
interface JournalQueryProps {
  page?: number;
  limit?: number;
}

const useGetJournal = ({ page = 1, limit = 10 }: JournalQueryProps) => {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<Journals[]>, ApiErrorResponse>({
    queryKey: [JOURNAL_CACHE_KEY, page, limit],
    queryFn: () => journalApi.getAll(`?${params.toString()}`),
  });
};
export default useGetJournal;
