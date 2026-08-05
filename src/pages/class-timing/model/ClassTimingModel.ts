export type EClassTimingKind = "LECTURE" | "TUTORIAL";
export type EClassTimingStatus = "ENABLED" | "DISABLED";

export interface ClassTiming {
  id?: number;
  name: string;
  kind: EClassTimingKind;
  /** 24h "06:30" — null when only the days should be shown */
  startTime?: string | null;
  endTime?: string | null;
  days?: string | null;
  order?: number;
  status?: EClassTimingStatus;
}
