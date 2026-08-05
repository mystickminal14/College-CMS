import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {
  NOTICE_TYPE_CACHE_KEY,
  NOTICE_TYPE_NAME_CACHE_KEY,
} from "../../../constants";

interface ChangeOrderPayload {
  id: number;
  newOrder: number;
}

const useChangeNoticeTypeOrder = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useChangeNoticeTypeOrder must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<null>, ApiErrorResponse, ChangeOrderPayload>({
    mutationFn: ({ id, newOrder }) => {
      const apiClient = new APIClient<null>(`/notice-types/change-order/${id}`);
      return apiClient.put({ newOrder });
    },
    onSuccess: (res) => {
      showToast(res.message || "Notice type order updated successfully!", "success");
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

export default useChangeNoticeTypeOrder;
