import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Teams } from "../model/TeamsModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { TEAM_CACHE_KEY } from "../../../constants";
import TeamsApi from "../services/TeamsService";

const useCreateTeams = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateTeams must be used within AppContext provider");
  }
  const { showToast } = appContext;
  
  return useMutation<ApiResponse<Teams>, ApiErrorResponse, Teams>({
    mutationFn: (Teams) => TeamsApi.post(Teams),

    onSuccess: (res) => {
      showToast(res.message || "Teams added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [TEAM_CACHE_KEY] });
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

export default useCreateTeams;
