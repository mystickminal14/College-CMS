import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { ALUMNI_CACHE_KEY } from "../../../../constants";
import { alumniDelete } from "../services/alumniServices";
import type { AlumniFormData } from "../models/alumniModel";

const useDeleteAlumni = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useDeleteAlumni must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<AlumniFormData>, ApiErrorResponse, string>({
    mutationFn: (id) => alumniDelete.delete(id),

    onSuccess: (res) => {
      showToast(res.message || "Alumni deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [ALUMNI_CACHE_KEY] });
    },

    onError: (err) => {
      let errorMsg = "";

      if (err.errors && err.errors.length > 0) {
        errorMsg = err.errors[0].message;
      } else {
        errorMsg = err.message || "Something went wrong!";
      }

      showToast(errorMsg, "error");
    },
  });
};

export default useDeleteAlumni;
