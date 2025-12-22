import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOCUMENT_CACHE_KEY } from "../../../constants";
import type { Documents } from "../model/DocsModel";
import documentApi from "../services/DocsService";

const useGetAllDocs = () => {
  return useQuery<ApiResponse<Documents[]>, ApiErrorResponse>({
    queryKey: [DOCUMENT_CACHE_KEY],
    queryFn: () => documentApi.getAll('all'),
  });
};

export default useGetAllDocs;
