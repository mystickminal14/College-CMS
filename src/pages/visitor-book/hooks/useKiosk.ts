import { useMutation } from "@tanstack/react-query";

import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { KioskRegistration, Visitor } from "../model/VisitorModel";
import { KioskPhotoApi, KioskRegisterApi } from "../services/KioskService";

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
    mutationFn: ({ qrToken, formData }) => KioskPhotoApi.postFile(formData, qrToken),
  });
