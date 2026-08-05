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

const useCreateNoticeType = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useCreateNoticeType must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<NoticeType>, ApiErrorResponse, NoticeType>({
    mutationFn: (noticeType) => NoticeTypeApi.post(noticeType),

    onSuccess: (res) => {
      showToast(res.message || "Notice type added successfully!", "success");
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

export default useCreateNoticeType;
