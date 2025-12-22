// auth/hooks/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";

const api = new APIClient<null>("/auth/logout");

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(),

    onSuccess:  () => {
       queryClient.removeQueries({ queryKey: ["me"] });
queryClient.clear();
     
    },
  });
};

export default useLogout;
