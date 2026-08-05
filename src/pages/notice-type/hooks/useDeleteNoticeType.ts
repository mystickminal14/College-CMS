import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import NoticeTypeApi from "../services/NoticeTypeService";
import type { NoticeType } from "../model/NoticeTypeModel";
import {
  NOTICE_TYPE_CACHE_KEY,
  NOTICE_TYPE_NAME_CACHE_KEY,
} from "../../../constants";

const useDeleteNoticeType = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteNoticeType must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<NoticeType>, ApiErrorResponse, number>({
    mutationFn: (id) => NoticeTypeApi.delete(id),
    onSuccess: (res) => {
      showToast(res.message || "Notice type deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [NOTICE_TYPE_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [NOTICE_TYPE_NAME_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteNoticeType;
