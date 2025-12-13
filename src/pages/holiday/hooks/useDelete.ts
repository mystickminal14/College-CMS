import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Holidays } from "../model/HolidayModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import HolidaysApi from "../services/HolidayFiles";
import { HOLIDAY_CACHE_KEY } from "../../../constants";

const useDeleteHolidays = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext)
    throw new Error("useDeleteHolidays must be used inside AppContext");
  const { showToast } = appContext;

  return useMutation<ApiResponse<Holidays>, ApiErrorResponse, Partial<Holidays>>({
    mutationFn: (payload: Partial<Holidays>) => {
      if (!payload.id) throw new Error("Holidays ID is required");
      return HolidaysApi.delete(
        `${encodeURIComponent(payload.id)}`
      );
    },
    onSuccess: (res) => {
      showToast(res.message || "Holidays Deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [HOLIDAY_CACHE_KEY] });
    },
    onError: (err) => {
      const msg =
        err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useDeleteHolidays;
