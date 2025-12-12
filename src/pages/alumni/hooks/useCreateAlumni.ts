import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Alumni } from "../model/AlumniModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { ALUMNI_CACHE_KEY } from "../../../constants";
import alumniApi from "../services/AlumniService";

const useCreateAlumni = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateAlumni must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<Alumni>, ApiErrorResponse, Alumni>({
    mutationFn: (Alumni) => alumniApi.post(Alumni),

    onSuccess: (res) => {
      showToast(res.message || "Alumni added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [ALUMNI_CACHE_KEY] });
    },

    onError: (err) => {
        let errorMsg='';
      if (err.errors && err.errors.length > 0) {
       errorMsg=err.errors[0].message; 
      } else {
         errorMsg=err.message || "Something went wrong!";
      }
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateAlumni;
