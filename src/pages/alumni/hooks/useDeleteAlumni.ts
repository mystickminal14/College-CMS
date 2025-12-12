import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Alumni } from "../model/AlumniModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { ALUMNI_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";
import alumniApi from "../services/AlumniService";


const useDeleteAlumni = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteAlumni must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Alumni>, ApiErrorResponse, Partial<Alumni>>({
    mutationFn: (payload: Partial<Alumni>) => {
      if (!payload.id) throw new Error("Alumni ID is required");
      return alumniApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Alumni Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [ALUMNI_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteAlumni;
