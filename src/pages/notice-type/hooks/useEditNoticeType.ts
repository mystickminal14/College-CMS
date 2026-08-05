import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {
  NOTICE_CACHE_KEY,
  NOTICE_TYPE_CACHE_KEY,
  NOTICE_TYPE_NAME_CACHE_KEY,
} from "../../../constants";
import type { NoticeType } from "../model/NoticeTypeModel";

const useEditNoticeType = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditNoticeType must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<NoticeType>,
    ApiErrorResponse,
    Partial<NoticeType> & { id: number }
  >({
    mutationFn: (payload) => {
      const { id, ...updateData } = payload;

      const apiClient = new APIClient<NoticeType>(
        `/notice-types/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Notice type updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [NOTICE_TYPE_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [NOTICE_TYPE_NAME_CACHE_KEY] });
      // notice rows embed the type name
      queryClient.invalidateQueries({ queryKey: [NOTICE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditNoticeType;

export const useChangeNoticeTypeStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<
    ApiResponse<NoticeType>,
    ApiErrorResponse,
    { id: number; status: "ENABLED" | "DISABLED" }
  >({
    mutationFn: ({ id, status }) => {
      if (!id) throw new Error("Notice type ID is required for status change");

      const apiClient = new APIClient<NoticeType>(
        `/notice-types/toggle-status/${encodeURIComponent(id)}`
      );

      return apiClient.put({ id, status });
    },
    onSuccess: (res) => {
      showToast(res.message || "Status changed successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [NOTICE_TYPE_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [NOTICE_TYPE_NAME_CACHE_KEY] });
    },
    onError: (err) => {
      const errorMsg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};
