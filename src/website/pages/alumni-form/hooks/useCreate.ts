import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import {  ALUMNI_FORM_CACHE_KEY } from "../../../../constants";
import type { AlumniFormData,  } from "../models/alumniModel";
import { alumniCreate } from "../services/alumniServices";

const useCreateAlumni = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateAlumni must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<AlumniFormData>, ApiErrorResponse, AlumniFormData>({
    mutationFn: (alumniFormData) => alumniCreate.post(alumniFormData),

    onSuccess: (res) => {
      showToast(res.message || "Form successfully Created successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [ALUMNI_FORM_CACHE_KEY] });
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
