import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import APIClient from "../../../services/apiClient";

interface SendStudentEmailPayload {
  email: string;
}

const useSendStudentEmail = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("useSendStudentEmail must be used within AppContext provider");
  }

  const { showToast } = appContext;

  return useMutation<ApiResponse<null>, ApiErrorResponse, SendStudentEmailPayload>({
    mutationFn: (payload) => {
      const apiClient = new APIClient<null>("/join-students");
      return apiClient.post(payload);
    },

    onSuccess: (res) => {
      showToast(res.message || "Email sent successfully!", "success");
    },

    onError: (err) => {
      let errorMsg = "";
      if (err.errors && err.errors.length > 0) {
        errorMsg = err.errors[0].message;
      } else {
        errorMsg = err.message || "Failed to send email!";
      }
      showToast(errorMsg, "error");
    },
  });
};

export default useSendStudentEmail;
