import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { EDITORIAL_CACHE_KEY } from "../../../constants";
import type { EditorialMember } from "../model/EditoralModel";
import EditorialApi from "../services/EditorialService";



const useGetEditorialAll = () => {

  return useQuery<ApiResponse<EditorialMember[]>, ApiErrorResponse>({
    queryKey: [EDITORIAL_CACHE_KEY],
    queryFn: () => EditorialApi.getAll(`all`),
  });
};

export default useGetEditorialAll;
