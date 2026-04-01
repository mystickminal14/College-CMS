import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NOTICE_CACHE_KEY } from "../../../constants";
import type { Notices } from "../model/NoticeModel";
import APIClient from "../../../services/apiClient";

const useEditNotices = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditNotices must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Notices>, ApiErrorResponse, Notices>({
    mutationFn: (payload: Notices) => {
      if (!payload.id) throw new Error("Notices ID is required");

      const { id, ...updateData } = payload;
      const apiClient = new APIClient<Notices>(
        `/notice/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Notices updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [NOTICE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditNotices;
