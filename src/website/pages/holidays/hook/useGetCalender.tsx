import { useQuery } from "@tanstack/react-query";
import type { EventModel } from "../model/CalenderModel";
import { HOLIDAY_CACHE_KEY } from "../../../../constants";
import { EventCalenderEndpoint } from "../services/CalenderService";

export interface EventParams {
  p1: string;
  p2: string;
  p3: string | null;
}

const encodeParams = (params: EventParams): string => {
  const payload: Record<string, string> = {
    p1: params.p1,
    p2: params.p2,
    ...(params.p3 ? { p3: params.p3 } : {}),
  };
  const jsonString = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(jsonString)));
};

export const useGetCalender = (params: EventParams) => {
  const encodedParams = encodeParams(params);
  return useQuery<EventModel[], Error>({
    queryKey: [HOLIDAY_CACHE_KEY, encodedParams],
    queryFn: async () => {
      try {
        const rawEvents = await EventCalenderEndpoint.getAll(encodedParams);
        return rawEvents.map((e: any) => ({
          eventId: e.event_id,
          eventName: e.event_name,
          summary: e.summary,
          location: e.location,
          organizerName: e.organizer_name,
          organizedBy: e.organized_by,
          eventType: e.event_type,
          status: e.status,
          colorCode: e.color_code,
          startDate: e.start_date,
          endDate: e.end_date,
          startTime: e.start_time,
          endTime: e.end_time,
        })) as EventModel[];
      } catch (err: any) {
        if (err.response?.status === 404) {
          return [];
        }
        throw err; // rethrow other errors
      }
    },
  });
};
