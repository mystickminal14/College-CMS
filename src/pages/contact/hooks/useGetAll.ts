import { useQuery } from "@tanstack/react-query";
import type { Contact } from "../model/ContactModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { CONTACT_CACHE_KEY } from "../../../constants";
import contactApi from "../services/UserService";

const useGetContactsAll = () => {
  return useQuery<ApiResponse<Contact[]>, ApiErrorResponse>({
    queryKey: [CONTACT_CACHE_KEY],
    queryFn: () => contactApi.getAll('all'),
  });
};

export default useGetContactsAll;
