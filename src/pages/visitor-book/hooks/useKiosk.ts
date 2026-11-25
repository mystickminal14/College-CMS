import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { KioskRegistration, Visitor, VisitorsTodaySummary } from "../model/VisitorModel";
import VisitorApi, { VisitorTodayApi } from "../services/VisitorService";
import { VISITOR_CACHE_KEY, VISITOR_TODAY_CACHE_KEY } from "../../../constants";
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

// The kiosk's own copy of today's register. Always refetched when the
// check-out screen opens — the app-wide default is refetchOnMount: false, and
// a visitor who checked in a minute ago must be on the list.
export const useKioskVisitorsToday = (enabled: boolean) =>
  useQuery<ApiResponse<VisitorsTodaySummary>, ApiErrorResponse>({
    queryKey: [VISITOR_TODAY_CACHE_KEY],
    queryFn: () => VisitorTodayApi.get(),
    enabled,
    refetchOnMount: "always",
  });

// No toast: the kiosk reports the result on its own screen.
export const useKioskCheckOut = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Visitor>, ApiErrorResponse, number>({
    mutationFn: (id) => VisitorApi.put({}, `${id}/checkout`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VISITOR_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISITOR_TODAY_CACHE_KEY] });
    },
  });
};
