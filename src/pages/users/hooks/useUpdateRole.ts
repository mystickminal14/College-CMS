import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { User } from "../model/UserModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { USER_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";

const apiClient = new APIClient<User>("/users");

const useUpdateRole = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useUpdateRole must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<User>, ApiErrorResponse, Partial<User>>({
    mutationFn: (payload: Partial<User>) => {
      if (!payload.id) throw new Error("User ID is required");
      return apiClient.put(
        payload,
        `update-role/${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "User role updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [USER_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useUpdateRole;
