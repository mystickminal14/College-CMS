import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { Contact } from "../model/ContactModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { CONTACT_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";

type TogglePayload = {
  id: number;
  status: "ENABLED" | "DISABLED";
};

const useToggleContactStatus = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useToggleContactStatus must be used inside AppContext");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<Contact>, ApiErrorResponse, TogglePayload>({
    mutationFn: ({ id, status }) => {
      const apiClient = new APIClient<Contact>(
        `/contact/status/${encodeURIComponent(id)}`
      );

      return apiClient.put({ status });
    },

    onSuccess: (res) => {
      showToast(res.message || "Contact status updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: [CONTACT_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message ||
        err.message ||
        "Failed to update contact status";
      showToast(msg, "error");
    },
  });
};

export default useToggleContactStatus;
