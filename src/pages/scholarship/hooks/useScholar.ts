import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import type { ScholarshipSchedule } from "../model";
import type { ApiResponse, ApiErrorResponse } from "../../../services/apiTypes";
import scholarshipApi from "../scholar-service";
import { SCHOLARSHIP_CACHE_KEY } from "./useGet";
import APIClient from "../../../services/apiClient";

// Get current open scholarship
export const useGetScholarship = () =>
  useQuery<ApiResponse<ScholarshipSchedule>, ApiErrorResponse>({
    queryKey: [SCHOLARSHIP_CACHE_KEY],
    queryFn: () => scholarshipApi.get(),
  });

// Add new scholarship
export const useAddScholarship = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<ApiResponse<ScholarshipSchedule>, ApiErrorResponse, Partial<ScholarshipSchedule>>({
    mutationFn: (data) => scholarshipApi.post(data),
    onSuccess: (res) => {
      showToast(res.message || "Scholarship added successfully!", "success");
       queryClient.invalidateQueries({
        queryKey: [SCHOLARSHIP_CACHE_KEY],
      });
    },
    onError: (err) => {
      const errorMsg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};

// Edit scholarship
export const useEditScholarship = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<ApiResponse<ScholarshipSchedule>, ApiErrorResponse, ScholarshipSchedule>({
    mutationFn: (data) => {
      if (!data.id) throw new Error("Scholarship ID is required for edit");
      const apiClient = new APIClient<ScholarshipSchedule>(
        `/scholarship/${encodeURIComponent(data.id)}`
      );

      return apiClient.put( data);
    },
    onSuccess: (res) => {
      showToast(res.message || "Scholarship updated successfully!", "success");
     queryClient.invalidateQueries({
        queryKey: [SCHOLARSHIP_CACHE_KEY],
      });
    },
    onError: (err) => {
      const errorMsg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};

// Change status (OPEN/CLOSED)
export const useChangeScholarshipStatus = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<ApiResponse<ScholarshipSchedule>, ApiErrorResponse, { id: number; status: "OPEN" | "CLOSED" }>({
    mutationFn: ({ id, status }) => {
      if (!id) throw new Error("Scholarship ID is required for status change");
      const apiClient = new APIClient<ScholarshipSchedule>(
        `/scholarship/status`
      );

      return apiClient.put(  {id, status });
    },
    onSuccess: (res) => {
      showToast(res.message || "Status changed successfully!", "success");
    queryClient.invalidateQueries({
        queryKey: [SCHOLARSHIP_CACHE_KEY],
      });
    },
    onError: (err) => {
      const errorMsg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(errorMsg, "error");
    },
  });
};
