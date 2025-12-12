import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import APIClient from "../../../services/apiClient";
import type { User } from "../model/UserModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { USER_CACHE_KEY } from "../../../constants";

const apiClient = new APIClient<User>("/users/add");

const useCreateUser = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateUser must be used within AppContext provider");
  }
  const { showToast } = appContext;
  let navigate: ((path: string) => void) | null = null;
  try {
    navigate = useNavigate();
  } catch (err) {
    navigate = null;
  }
  return useMutation<ApiResponse<User>, ApiErrorResponse, User>({
    mutationFn: (user) => apiClient.post(user),

    onSuccess: (res) => {
      showToast(res.message || "User added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [USER_CACHE_KEY] });
       

    },

    onError: (err) => {
        let errorMsg='';
      if (err.errors && err.errors.length > 0) {
       errorMsg=err.errors[0].message; // show first validation error
      } else {
         errorMsg=err.message || "Something went wrong!";
      }
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateUser;
