import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NOTICE_CACHE_KEY } from "../../../constants";
import type { Notices } from "../model/NoticeModel";
import NoticesApi from "../services/NoticeService";

const useDeleteNotices = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteNotices must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Notices>, ApiErrorResponse, Partial<Notices>>({
    mutationFn: (payload: Partial<Notices>) => {
      if (!payload.id) throw new Error("Notices ID is required");
      return NoticesApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Notices Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [NOTICE_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteNotices;
