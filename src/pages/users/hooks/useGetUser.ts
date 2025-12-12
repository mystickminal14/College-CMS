import { useQuery } from "@tanstack/react-query";
import type { User } from "../model/UserModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import userApi from "../services/UserService";
import { USER_CACHE_KEY } from "../../../constants";

interface UsersQueryProps {
  search?: string;
  page?: number;
  limit?: number;
}

const useGetUsers = ({ search = "", page = 1, limit = 10 }: UsersQueryProps) => {
  return useQuery<ApiResponse<User[]>, ApiErrorResponse>({
    queryKey: [USER_CACHE_KEY, search, page, limit],
    queryFn: () =>
      userApi.getAll(
        `?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      ),
  });
};

export default useGetUsers;
