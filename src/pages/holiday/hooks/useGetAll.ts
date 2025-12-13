import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {HOLIDAY_CACHE_KEY } from "../../../constants";
import HolidaysApi from "../services/HolidayFiles";
import type { Holidays } from "../model/HolidayModel";

const useGetHolidays = () => {
  return useQuery<ApiResponse<Holidays[]>, ApiErrorResponse>({
    queryKey: [HOLIDAY_CACHE_KEY],
    queryFn: () => HolidaysApi.getAll(),
  });
};

export default useGetHolidays;
