import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import ShiftApi from "../services/ShiftService";
import type { Shift } from "../model/ShiftModel";
import { SHIFT_CACHE_KEY, SHIFT_NAME_CACHE_KEY } from "../../../constants";

const useDeleteShift = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useDeleteShift must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<Shift>, ApiErrorResponse, number>({
    mutationFn: (id) => ShiftApi.delete(id),
    onSuccess: (res) => {
      showToast(res.message || "Shift deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [SHIFT_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [SHIFT_NAME_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteShift;
