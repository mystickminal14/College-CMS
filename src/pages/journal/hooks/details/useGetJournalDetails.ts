import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { JOURNAL_DETIALS_CACHE_KEY } from "../../../../constants";
import { journalDetails } from "../../services/JournalService";
import type { JournalDetailsPayload } from "../..//model/JournalModel";

const useGetJournalDetails = (id: string) => {
  return useQuery<ApiResponse<JournalDetailsPayload[]>, ApiErrorResponse>({
    queryKey: [JOURNAL_DETIALS_CACHE_KEY, id], 
    queryFn: () => journalDetails.getAll(id),   
    enabled: !!id,
  });
};

export default useGetJournalDetails;
