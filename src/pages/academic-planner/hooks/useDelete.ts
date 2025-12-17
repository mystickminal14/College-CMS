import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import plannerApi, { plannerChildApi } from "../services/PlannerService";
import { PLANNEER_CACHE_KEY, PLANNEER_CHILD_CACHE_KEY } from "../../../constants";

type DeletePayload = {
  id: number;        // parent or child ID
  type: "PARENT" | "CHILD";
};

const useDeletePlanner = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: DeletePayload) => {
      if (type === "PARENT") {
        return plannerApi.delete(id); 
      } else {
        return plannerChildApi.delete(id);
      }
    },

    onSuccess: (res) => {
      showToast(res.message, "success");

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: [PLANNEER_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [PLANNEER_CHILD_CACHE_KEY] });
    },

    onError: (err: any) => {
      showToast(err.message || "Failed to delete", "error");
    },
  });
};

export default useDeletePlanner;
