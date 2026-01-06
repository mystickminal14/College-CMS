// hooks/useGetJournalsGroupedByYear.ts
import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { journalApiAll, } from "../../services/JournalService"; // can create grouped endpoint here
import type { JournalsGroupedByYear } from "../../model/JournalModel";

const useGetJournalsGroupedByYear = () => {
  return useQuery<ApiResponse<JournalsGroupedByYear>, ApiErrorResponse>({
    queryKey: ["grouped-year"], // unique key for this API
    queryFn: () => journalApiAll.get(), // implement this in your service
  });
};

export default useGetJournalsGroupedByYear;
