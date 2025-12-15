import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Downloads } from "../model/handbookModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOWNLOAD_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";

interface CreateFilePayload {
  file: File;
  name: string;
}

export const useUpdatefile = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useUpdatefile must be used within AppContext");

  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Downloads>, ApiErrorResponse, CreateFilePayload>({
    mutationFn: async ({ file, name }) => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);

      // Only POST — because backend only supports CREATE
      const apiClient = new APIClient<Downloads>("/downloads");
      return apiClient.postFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Download uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [DOWNLOAD_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};
