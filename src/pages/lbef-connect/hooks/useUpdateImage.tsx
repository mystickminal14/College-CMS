import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Connects } from "../model/Connects";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { CONNECT_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";

interface CreateimagePayload {
  file: File;
  issue:string;
  duration:string;
  volumne:string;
}

export const useUpdateimageConnect = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useUpdateimage must be used within AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Connects>, ApiErrorResponse, CreateimagePayload>({
    mutationFn: async ({ issue, duration, volumne, file }:CreateimagePayload) => {
       const formData = new FormData();
      formData.append("issue", issue);
      formData.append("file", file);
      formData.append("duration", duration);

      formData.append("volume", volumne);


      const apiClient = new APIClient<Connects>("/connect");
      return apiClient.postFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Document uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CONNECT_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};
