// auth/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import type { LoginUser } from "../model/LoginModel";
import type { ApiErrorResponse, ApiResponse } from "../../services/apiTypes";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/ContextApp";

const api = new APIClient<LoginUser>("/auth/login");

const useLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(AppContext)!;

  return useMutation<ApiResponse<LoginUser>, ApiErrorResponse, LoginUser>({
    mutationFn: (data) => api.post(data),

    onSuccess: (res) => {
      showToast(res.message || "Login successful", "success");
      navigate("/app/course"); // ✅ cookie already set
    },

    onError: (err) => {
      showToast(err.message || "Login failed", "error");
    },
  });
};

export default useLogin;
