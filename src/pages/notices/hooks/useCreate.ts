import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { NOTICE_CACHE_KEY } from "../../../constants";
import NoticesApi from "../services/NoticeService";
import type { Notices } from "../model/NoticeModel";

const useCreateNotices = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateNotices must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<Notices>, ApiErrorResponse, Notices>({
    mutationFn: (Notices) => NoticesApi.post(Notices),

    onSuccess: (res) => {
      showToast(res.message || "Notice added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [NOTICE_CACHE_KEY] });
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

export default useCreateNotices;
