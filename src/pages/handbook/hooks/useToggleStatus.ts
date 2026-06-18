import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { Downloads } from "../model/handbookModel";
import { BASE_URL, DOWNLOAD_CACHE_KEY } from "../../../constants";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";

const useToggleDownloadStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<ApiResponse<Downloads>, ApiErrorResponse, number>({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      const res = await axios.patch<ApiResponse<Downloads>>(
        `${BASE_URL}/downloads/${id}/toggle-status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [DOWNLOAD_CACHE_KEY] });
      showToast(res.message ?? "Status updated", "success");
    },
    onError: (err: any) => {
      showToast(err.response?.data?.message ?? "Failed to update status", "error");
    },
  });
};

export default useToggleDownloadStatus;
