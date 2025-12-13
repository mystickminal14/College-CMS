export interface Holidays {
  id?: number;
  type: HolidayType;
  image: string;
}
export type HolidayType = "ADMINISTRATIVE" | "ACADEMIC";
