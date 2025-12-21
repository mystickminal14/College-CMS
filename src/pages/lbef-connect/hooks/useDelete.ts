import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Connects } from "../model/Connects";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import ConnectsApi from "../services/ConnectService";
import { CONNECT_CACHE_KEY,  } from "../../../constants";

const useDeleteConnects = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteConnects must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Connects>, ApiErrorResponse, Partial<Connects>>({
    mutationFn: (payload: Partial<Connects>) => {
      if (!payload.id) throw new Error("Connects ID is required");
      return ConnectsApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Connects Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CONNECT_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteConnects;
