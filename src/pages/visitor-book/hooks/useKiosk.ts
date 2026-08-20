import { useMutation, useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { KioskRegistration, KioskStaff, Visitor } from "../model/VisitorModel";
import { KioskPhotoApi, KioskRegisterApi, KioskStaffApi } from "../services/KioskService";

export const KIOSK_STAFF_CACHE_KEY = "kiosk_staff";

interface StaffQuery {
  search?: string;
  page: number;
  limit: number;
}

export const useKioskStaff = ({ search, page, limit }: StaffQuery) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<KioskStaff[]>, ApiErrorResponse>({
    queryKey: [KIOSK_STAFF_CACHE_KEY, search, page, limit],
    queryFn: () => KioskStaffApi.getAll(`?${params.toString()}`),
    // Keeps the previous page on screen while the next one loads, so the
    // dropdown does not collapse and shift options under the visitor's finger.
    placeholderData: (previous) => previous,
  });
};

export const useKioskRegister = () =>
  useMutation<ApiResponse<KioskRegistration>, ApiErrorResponse, Visitor>({
    mutationFn: (visitor) => KioskRegisterApi.post(visitor),
  });

interface UploadKioskPhotoInput {
  qrToken: string;
  formData: FormData;
}

export const useUploadKioskPhoto = () =>
  useMutation<ApiResponse<null>, ApiErrorResponse, UploadKioskPhotoInput>({
    mutationFn: ({ qrToken, formData }) => KioskPhotoApi.postImage(formData, qrToken),
  });
