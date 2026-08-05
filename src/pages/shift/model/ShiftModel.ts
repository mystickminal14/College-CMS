export interface Shift {
  id?: number;
  name: string;
  slug?: string;
  order?: number;
  status?: EShiftStatus;
}

export type EShiftStatus = "ENABLED" | "DISABLED";

export interface UpdateShiftPayload {
  id: number;
  name: string;
}
