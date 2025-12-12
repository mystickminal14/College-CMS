import { useMutation } from "@tanstack/react-query";
import type { LoginUser } from "../model/LoginModel";
import APIClient from "../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../services/apiTypes";
import { useContext } from "react";
import { AppContext } from "../../context/ContextApp";
import { useNavigate } from "react-router-dom";

const apiClient = new APIClient<LoginUser>("/auth/login");

const useLogin = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useLogin must be used within AppContext provider");
  }
  const { showToast } = appContext;
  let navigate: ((path: string) => void) | null = null;
  try {
    navigate = useNavigate();
  } catch (err) {
    navigate = null;
  }
  return useMutation<ApiResponse<LoginUser>, ApiErrorResponse, LoginUser>({
    mutationFn: (user) => apiClient.post(user),

    onSuccess: (res) => {
      showToast(res.message || "Login successful!", "success");
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        if (navigate) {
          navigate("/app/course");
          //  queryClient.invalidateQueries({ queryKey: [PROFILE_CACHE_KEY] });
        }
      } else {
        showToast("No token received from server!", "error");
      }

    },

    onError: (error) => {
      const errorMsg =
        error.message || "Login failed!";
      showToast(errorMsg, "error");
    },
  });
};

export default useLogin;
