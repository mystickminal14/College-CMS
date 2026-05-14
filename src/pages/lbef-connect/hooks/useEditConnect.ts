import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Connects } from "../model/Connects";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { CONNECT_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";

interface EditConnectPayload {
  id: number;
  issue?: number;
  duration?: string;
  volume?: number;
  pdf?: File;
  image?: File;
}

export const useEditConnect = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useEditConnect must be used within AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Connects>, ApiErrorResponse, EditConnectPayload>({

    mutationFn: async ({ id, issue, duration, volume, pdf, image }) => {
      const formData = new FormData();
      if (issue !== undefined) formData.append("issue", issue.toString());
      if (duration !== undefined) formData.append("duration", duration);
      if (volume !== undefined) formData.append("volume", volume.toString());
      if (pdf) formData.append("file", pdf);
      if (image) formData.append("image", image);

      const apiClient = new APIClient<Connects>(`/connect/edit/${id}`);
      return apiClient.putFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Connect updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CONNECT_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};