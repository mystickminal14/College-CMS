import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import DeptApi from "../services/DeptService";
import type { Dept } from "../model/DeptModel";
import { DEPT_CACHE_KEY } from "../../../constants";

const useCreateDept = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreatecourse must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<Dept>, ApiErrorResponse, Dept>({
    mutationFn: (course) => DeptApi.post(course),

    onSuccess: (res) => {
      showToast(res.message || "Department added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [DEPT_CACHE_KEY] });
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

export default useCreateDept;
