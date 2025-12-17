import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { INTAKE_CACHE_KEY } from "../../../constants";
import IntakesApi from '../services/IntakeService';
import type { Intakes } from "../model/IntakeModel";

const useCreateIntakes = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateIntakes must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<Intakes>, ApiErrorResponse, Intakes>({
    mutationFn: (Intakes) => IntakesApi.post(Intakes),

    onSuccess: (res) => {
      showToast(res.message || "Intakes added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [INTAKE_CACHE_KEY] });
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

export default useCreateIntakes;
