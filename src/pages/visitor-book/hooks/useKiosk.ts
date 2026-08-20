import { useMutation, useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type {
  KioskDepartment,
  KioskRegistration,
  KioskStaff,
  Visitor,
} from "../model/VisitorModel";
import {
  KioskDepartmentApi,
  KioskPhotoApi,
  KioskRegisterApi,
  KioskStaffApi,
} from "../services/KioskService";

export const KIOSK_DEPT_CACHE_KEY = "kiosk_departments";
export const KIOSK_STAFF_CACHE_KEY = "kiosk_staff";

export const useKioskDepartments = () =>
  useQuery<ApiResponse<KioskDepartment[]>, ApiErrorResponse>({
    queryKey: [KIOSK_DEPT_CACHE_KEY],
    queryFn: () => KioskDepartmentApi.getAll(),
    staleTime: 5 * 60 * 1000,
  });

interface StaffQuery {
  department?: string;
  search?: string;
  page: number;
  limit: number;
}

export const useKioskStaff = ({ department, search, page, limit }: StaffQuery) => {
  const params = new URLSearchParams();
  if (department) params.append("department", department);
  if (search) params.append("search", search);
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<KioskStaff[]>, ApiErrorResponse>({
    queryKey: [KIOSK_STAFF_CACHE_KEY, department, search, page, limit],
    queryFn: () => KioskStaffApi.getAll(`?${params.toString()}`),
    // Keeps the previous page on screen while the next one loads, so the grid
    // does not collapse and shift the buttons under the visitor's finger.
    placeholderData: (previous) => previous,
  });
};

export const useKioskRegister = () =>
  useMutation<ApiResponse<KioskRegistration>, ApiErrorResponse, Visitor>({
    mutationFn: (visitor) => KioskRegisterApi.post(visitor),
  });

export const useKioskPhotoUpload = () =>
  useMutation<ApiResponse<null>, ApiErrorResponse, { qrToken: string; file: File }>({
    mutationFn: ({ qrToken, file }) => {
      const formData = new FormData();
      formData.append("attachment", file);
      return KioskPhotoApi.putFile(formData, qrToken);
    },
  });
