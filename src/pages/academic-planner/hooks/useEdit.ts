// hooks/useEditSession.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import plannerApi from "../services/PlannerService";
import { PLANNEER_CACHE_KEY } from "../../../constants";

interface EditSessionPayload {
  id: number;
  session: string;
}

const useEditSession = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, session }: EditSessionPayload) =>
      plannerApi.put({ session }, id),

    onSuccess: (res) => {
      showToast(res.message, "success");
                    queryClient.invalidateQueries({ queryKey: [PLANNEER_CACHE_KEY] });
    
    },

    onError: (err: any) => {
      showToast(err.message, "error");
    },
  });
};

export default useEditSession;
