import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { Alumni } from "../model/AlumniModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { ALUMNI_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";

const useEditAlumni = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditAlumni must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Alumni>, ApiErrorResponse, Partial<Alumni>>({
    mutationFn: (payload: Partial<Alumni>) => {
      if (!payload.id) throw new Error("Alumni ID is required");

      const { id, ...updateData } = payload;
      const apiClient = new APIClient<Partial<Alumni>>(
        `/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Alumni updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [ALUMNI_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditAlumni;
