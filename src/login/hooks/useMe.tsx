import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import type { FrontendUser } from "../model/permission";
import type { ApiErrorResponse, ApiResponse } from "../../services/apiTypes";

const api = new APIClient<FrontendUser>("/auth/me");

const useMe = () => {
  return useQuery<ApiResponse<FrontendUser>, ApiErrorResponse>({
    queryKey: ["me"],
    queryFn: () => api.get(),
  });
};

export default useMe;
