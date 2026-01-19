// auth/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import type { LoginUser } from "../model/LoginModel";
import type { ApiErrorResponse, ApiResponse } from "../../services/apiTypes";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/ContextApp";
import type { PermissionNameType } from "../model/permission";

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

      if (setUserPermissions) {
        setUserPermissions(user.permissions.map(p => p.permission.name));
      } if (user.role === "SUPERADMIN" || user.role === "ADMIN") {
        navigate("/app/course");
        return;
      }

      if (user.permissions && user.permissions.length > 0) {
        const firstPermission = user.permissions[0].permission.name as PermissionNameType;

        const redirectMap: Record<PermissionNameType, string> = {
          USERS: "/app/user",
          COURSES: "/app/course",
          TEAMS: "/app/teams",
          ALUMNI: "/app/alumni",
          NEWS: "/app/media/news",
          JOURNALS: "/app/media/journals",
          EDITORIAL_BOARD: "/app/media/editorial-board",
          CONNECT: "/app/media/connect",
          GALLERY: "/app/media/gallery",
          NOTICE: "/app/administation/notice",
          CONTACT: "/app/administation/contact",
          HOLIDAY: "/app/administation/holiday",
          RECOGNITION: "/app/administation/recognition",
          ACHIEVEMENT: "/app/administation/achievement",
          INTAKE: "/app/admission/intake",
          DOCUMENTS: "/app/admission/docs",
          ACADEMIC_PLANNER: "/app/students/planner",
          FEE_PLANNER: "/app/students/fee-planner",
          DOWNLOADS: "/app/students/downloads",
          ALMUNI_FORM: "",
          PLANNER_COURSE: "",
          SCHOLARSHIP: ""
        };

        navigate(redirectMap[firstPermission] || "/app/course");
        return;
      }

      navigate("/app/course");
    },

    onError: (err) => {
      showToast(err.message || "Login failed", "error");
    },
  });
};

export default useLogin;
