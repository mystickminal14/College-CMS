import { useQuery } from "@tanstack/react-query";
import type { Contact } from "../model/ContactModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { CONTACT_CACHE_KEY } from "../../../constants";
import contactApi from "../services/UserService";

interface ContactsQueryProps {
  search?: string;
  page?: number;
  limit?: number;
}

const useGetContacts = ({ search = "", page = 1, limit = 10 }: ContactsQueryProps) => {
  return useQuery<ApiResponse<Contact[]>, ApiErrorResponse>({
    queryKey: [CONTACT_CACHE_KEY, search, page, limit],
    queryFn: () =>
      contactApi.getAll(
        `?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetContacts;
