import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ScholarshipSchedule } from "../model";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import scholarshipApi from "../scholar-service";
import { SCHOLARSHIP_CACHE_KEY } from "./useGet";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";

const useEditScholarship = () => {
 const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateUser must be used within AppContext provider");
  }
  const { showToast } = appContext;
  return useMutation<
    ApiResponse<ScholarshipSchedule>,
    ApiErrorResponse,                
    ScholarshipSchedule             
  >({
    mutationFn: (data) => scholarshipApi.put(data),

    onSuccess: (res) => {
      showToast(res.message || "User added successfully!", "success");

      queryClient.invalidateQueries({
        queryKey: [SCHOLARSHIP_CACHE_KEY],
      });
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

export default useEditScholarship;
