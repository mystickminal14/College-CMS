import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Downloads } from "../model/handbookModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOWNLOAD_CACHE_KEY } from "../../../constants";
import DownloadsApi from "../services/HandBookService";

const useDeleteDownloads = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteDownloads must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Downloads>, ApiErrorResponse, Partial<Downloads>>({
    mutationFn: (payload: Partial<Downloads>) => {
      if (!payload.id) throw new Error("Downloads ID is required");
      return DownloadsApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Downloads Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [DOWNLOAD_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteDownloads;
