import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {  PLANNEER_CACHE_KEY } from "../../../constants";
import plannerApi from "../services/PlannerService";
import type { CreateParentPayload,  } from "../model/PlannerModel";

const useCreateParent = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateIntakes must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<CreateParentPayload>, ApiErrorResponse, CreateParentPayload>({
    mutationFn: (CreateParentPayload) => plannerApi.post(CreateParentPayload),

    onSuccess: (res) => {
      showToast(res.message || "Academic Planner added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [PLANNEER_CACHE_KEY] });
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

export default useCreateParent;
