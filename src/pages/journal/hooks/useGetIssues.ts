import { useQuery } from "@tanstack/react-query";
import {  JOURNAL_ISSUE_CACHE_KEY } from "../../../constants";
import type { Journals } from "../model/JournalModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import  { journalChildrenApi } from "../services/JournalService";
interface JournalQueryProps {
    id:string;
  page?: number;
  limit?: number;
}

const useGetJournalChild = ({id='', page = 1, limit = 10 }: JournalQueryProps) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  return useQuery<ApiResponse<Journals[]>, ApiErrorResponse>({
    queryKey: [JOURNAL_ISSUE_CACHE_KEY, page, limit],
    queryFn: () => journalChildrenApi.getAll(`${id}?${params.toString()}`),
  });
};
export default useGetJournalChild;
