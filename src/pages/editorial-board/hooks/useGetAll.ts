import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { EDITORIAL_CACHE_KEY } from "../../../constants";
import type { EditorialMember } from "../model/EditoralModel";
import EditorialApi from "../services/EditorialService";

interface EditorialQueryProps {
  search?: string;
  honoraryPosition?: string;
  page?: number;
  limit?: number;
}

const useGetEditorial = ({
  search = "",
  honoraryPosition = "",
  page = 1,
  limit = 10,
}: EditorialQueryProps) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (honoraryPosition) params.append("honoraryPosition", honoraryPosition);
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<EditorialMember[]>, ApiErrorResponse>({
    queryKey: [EDITORIAL_CACHE_KEY, search, honoraryPosition, page, limit],
    queryFn: () => EditorialApi.getAll(`?${params.toString()}`),
  });
};

export default useGetEditorial;
