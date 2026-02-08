import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DEPT_CACHE_KEY } from "../../../constants";
import type {  Dept,} from "../model/DeptModel";
const useEditDept = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useEditCourses must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<
    ApiResponse<Dept>,        // ✅ response type
    ApiErrorResponse,
    Partial<Dept> & { id: number } // ✅ payload must include id
  >({
    mutationFn: (payload) => {
      const { id, ...updateData } = payload;

      const apiClient = new APIClient<Dept>(
        `/dept/${encodeURIComponent(id)}`
      );

      return apiClient.put(updateData);
    },
    onSuccess: (res) => {
      showToast(res.message || "Dept updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [DEPT_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditDept;
export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<ApiResponse<Dept>, ApiErrorResponse, { id: number; status: "ENABLED" | "DISABLED" }>({
    mutationFn: ({ id, status }) => {
      if (!id) throw new Error("Scholarship ID is required for status change");
      const apiClient = new APIClient<Dept>(
        `/dept/toggle/status/${encodeURIComponent(id)}`
      );

      return apiClient.put(  {id, status });
    },
    onSuccess: (res) => {
      showToast(res.message || "Status changed successfully!", "success");
       queryClient.invalidateQueries({ queryKey: [DEPT_CACHE_KEY] });

    },
    onError: (err) => {
      const errorMsg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};
