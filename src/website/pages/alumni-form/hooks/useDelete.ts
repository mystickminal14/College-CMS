import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { ALUMNI_FORM_CACHE_KEY } from "../../../../constants";
import type { AlumniFormData,  } from "../models/alumniModel";
import type { STATUS } from "../../../../pages/gallery/model/GallModel";
import APIClient from "../../../../services/apiClient";

interface ToggleStatusPayload {
  id: number;
  status: STATUS;
}

const useToggleAlumniStatus = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) {
    throw new Error("useToggleAlumniStatus must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<AlumniFormData>, ApiErrorResponse, ToggleStatusPayload>({
    mutationFn: ({ id, status }) => {
      const apiClient = new APIClient<AlumniFormData>(
        `/alumni-form/toggle/${encodeURIComponent(id)}`
      );

      return apiClient.put({ status });
    },


    onSuccess: (res) => {
      showToast(res.message || "Alumni status updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [ALUMNI_FORM_CACHE_KEY] });
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

export default useToggleAlumniStatus;
