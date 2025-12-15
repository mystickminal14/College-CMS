import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NOTICE_CACHE_KEY } from "../../../constants";
import type {  Notices } from "../model/NoticeModel";
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

  return useMutation<ApiResponse<Notices>, ApiErrorResponse, CreateFilePayload>({
    mutationFn: async ({ file, name }) => {
      const formData = new FormData();
      formData.append("file", file);

      const apiClient = new APIClient<Notices>(`/notice/upload/${name}`);
      return apiClient.putFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Download uploaded successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [NOTICE_CACHE_KEY] });
    },

    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};
