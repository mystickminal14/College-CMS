import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Teams } from "../model/TeamsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { TEAM_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";

const useEditTeams = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditTeams must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Teams>, ApiErrorResponse, Teams>({
    mutationFn: (payload: Teams) => {
      if (!payload.id) throw new Error("Teams ID is required");

      const { id, ...updateData } = payload;
      const apiClient = new APIClient<Teams>(
        `/teams/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Teams updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [TEAM_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<ApiResponse<Teams>, ApiErrorResponse, { id: number; status: "ENABLED" | "DISABLED" }>({
    mutationFn: ({ id, status }) => {
      if (!id) throw new Error("Scholarship ID is required for status change");
      const apiClient = new APIClient<Teams>(
        `/teams/toggle/status/${encodeURIComponent(id)}`
      );

      return apiClient.put(  {id, status });
    },
    onSuccess: (res) => {
      showToast(res.message || "Status changed successfully!", "success");
       queryClient.invalidateQueries({ queryKey: [TEAM_CACHE_KEY] });

    },
    onError: (err) => {
      const errorMsg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};


export default useEditTeams;
