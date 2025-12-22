// auth/hooks/useMe.ts
import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";

const api = new APIClient<any>("/auth/me");

const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api.get(),
    retry: false,
  });
};

export default useMe;
