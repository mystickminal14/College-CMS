import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Recognitions } from "../model/RecognitionsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { RECOGNITION_CACHE_KEY } from "../../../constants";
import recognitionsApi from "../services/RecognitionsService";

const useCreateRecognitions = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateRecognitions must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<Recognitions>, ApiErrorResponse, Recognitions>({
    mutationFn: (Recognitions) => recognitionsApi.post(Recognitions),

    onSuccess: (res) => {
      showToast(res.message || "Recognitions added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [RECOGNITION_CACHE_KEY] });
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

export default useCreateRecognitions;
