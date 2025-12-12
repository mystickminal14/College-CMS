import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Teams } from "../model/TeamsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { TEAM_CACHE_KEY } from "../../../constants";
import TeamsApi from "../services/TeamsService";

const useDeleteTeams = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteTeams must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Teams>, ApiErrorResponse, Partial<Teams>>({
    mutationFn: (payload: Partial<Teams>) => {
      if (!payload.id) throw new Error("Teams ID is required");
      return TeamsApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Teams Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [TEAM_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteTeams;
