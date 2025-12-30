import APIClient from "../baseUrl/baseUrl";
import type { EventModel } from "../model/CalenderModel";

export const EventCalenderEndpoint=new APIClient<EventModel>('/event')