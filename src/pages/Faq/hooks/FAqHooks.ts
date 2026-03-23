// ─── useGetFaqs ───────────────────────────────────────────────────────────────
import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { FAQ_CACHE_KEY } from "../../../constants";

interface FaqQueryProps {
  page?: number;
  limit?: number;
}

export const useGetFaqs = ({ page = 1, limit = 10 }: FaqQueryProps) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<FAQ[]>, ApiErrorResponse>({
    queryKey: [FAQ_CACHE_KEY, page, limit],
    queryFn: () => FaqApi.getAll(`?${params.toString()}`),
  });
};
export const useGetActiveFaqs = () => {
  return useQuery<ApiResponse<FAQ[]>, ApiErrorResponse>({
    queryKey: [FAQ_CACHE_KEY, "active"],
    queryFn: () => FaqApi.getAll("active"),
  });
};
 

// ─── useAddFaq ────────────────────────────────────────────────────────────────
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import APIClient from "../../../services/apiClient";
import type { FAQ } from "../model/FAQmodel";
import FaqApi from "../service/FAqSErvice";

interface AddFaqPayload {
  questions: string;
  answers: string;
}

export const useAddFaq = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useAddFaq must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<FAQ>, ApiErrorResponse, AddFaqPayload>({
    mutationFn: (payload) => FaqApi.post(payload),
    onSuccess: (res) => {
      showToast(res.message || "FAQ added successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [FAQ_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to add FAQ";
      showToast(msg, "error");
    },
  });
};

// ─── useUpdateFaq ─────────────────────────────────────────────────────────────
interface UpdateFaqPayload {
  id: number;
  questions: string;
  answers: string;
}

export const useUpdateFaq = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useUpdateFaq must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<FAQ>, ApiErrorResponse, UpdateFaqPayload>({
    mutationFn: ({ id, ...payload }) => {
      const apiClient = new APIClient<FAQ>(`/faq/${encodeURIComponent(id)}`);
      return apiClient.put(payload);
    },
    onSuccess: (res) => {
      showToast(res.message || "FAQ updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [FAQ_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to update FAQ";
      showToast(msg, "error");
    },
  });
};

// ─── useDeleteFaq ─────────────────────────────────────────────────────────────
export const useDeleteFaq = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useDeleteFaq must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<FAQ>, ApiErrorResponse, { id: number }>({
    mutationFn: ({ id }) => FaqApi.delete(`${encodeURIComponent(id)}`),
    onSuccess: (res) => {
      showToast(res.message || "FAQ deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [FAQ_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to delete FAQ";
      showToast(msg, "error");
    },
  });
};

// ─── useToggleFaqStatus ───────────────────────────────────────────────────────
export const useToggleFaqStatus = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useToggleFaqStatus must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<FAQ>, ApiErrorResponse, { id: number }>({
    mutationFn: ({ id }) => {
      const apiClient = new APIClient<FAQ>(`/faq/toggle-status/${encodeURIComponent(id)}`);
      return apiClient.put({});
    },
    onSuccess: (res) => {
      showToast(res.message || "Status updated!", "success");
      queryClient.invalidateQueries({ queryKey: [FAQ_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to update status";
      showToast(msg, "error");
    },
  });
};

// ─── useChangeFaqOrder ────────────────────────────────────────────────────────
interface ChangeOrderPayload {
  id: number;
  newOrder: number;
}

export const useChangeFaqOrder = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("useChangeFaqOrder must be used within AppContext");
  const { showToast } = appContext;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<FAQ>, ApiErrorResponse, ChangeOrderPayload>({
    mutationFn: ({ id, newOrder }) => {
      const apiClient = new APIClient<FAQ>(`/faq/change-order/${encodeURIComponent(id)}`);
      return apiClient.put({ newOrder });
    },
    onSuccess: (res) => {
      showToast(res.message || "Order updated!", "success");
      queryClient.invalidateQueries({ queryKey: [FAQ_CACHE_KEY] });
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Failed to update order";
      showToast(msg, "error");
    },
  });
};