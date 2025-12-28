import { useQuery } from "@tanstack/react-query";
import type { Journals } from "../model/JournalModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import journalApi from "../services/JournalService";


const useGetAllJournalsWithChildren = () => {
 
  return useQuery<ApiResponse<Journals[]>, ApiErrorResponse>({
    queryKey: [ "all"],
    queryFn: () => journalApi.getAll(`all`),
  });
};

export default useGetAllJournalsWithChildren;
