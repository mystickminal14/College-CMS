// auth/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import type { LoginUser } from "../model/LoginModel";
import type { ApiErrorResponse, ApiResponse } from "../../services/apiTypes";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/ContextApp";
import { getHomeRoute } from "../utils/homeRoute";

const api = new APIClient<LoginUser>("/auth/login");

const useLogin = () => {
  const navigate = useNavigate();
  const { showToast, setUserPermissions } = useContext(AppContext)!;

  return useMutation<ApiResponse<LoginUser>, ApiErrorResponse, LoginUser>({
    mutationFn: (data) => api.post(data),

    onSuccess: (res) => {
      const user = res.data;
      if (!user) {
        showToast("Login failed: No user data returned", "error");
        return;
      }


      showToast(res.message || "Login successful", "success");

      const permissions = user.permissions.map((p) => p.permission.name);
      setUserPermissions?.(permissions);
      navigate(getHomeRoute(permissions));
    },

    onError: (err) => {
      showToast(err.message || "Login failed", "error");
    },
  });
};

export default useLogin;
