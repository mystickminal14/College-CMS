import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { TEAM_CACHE_KEY } from "../../../constants";

interface ChangeOrderPayload {
  id: number;
  newOrder: number;
} 

const useChangeTeamOrder = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useChangeTeamOrder must be used inside AppContext");
  }

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<null>,
    ApiErrorResponse,
    ChangeOrderPayload
  >({
    mutationFn: ({ id, newOrder }) => {
      const apiClient = new APIClient<null>(`/teams/change-order/${id}`);
      return apiClient.put({ newOrder });
    },
    onSuccess: (res) => {
      showToast(res.message || "Team order updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [TEAM_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message ||
        err.message ||
        "Something went wrong!";
      showToast(msg, "error");
    },
  });
};


export default useChangeTeamOrder;
