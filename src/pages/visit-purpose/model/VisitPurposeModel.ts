export interface VisitPurpose {
  id?: number;
  name: string;
  slug?: string;
  order?: number;
  isOther?: boolean;
  status?: EVisitPurposeStatus;
}

export type EVisitPurposeStatus = "ENABLED" | "DISABLED";

export interface UpdateVisitPurposePayload {
  id: number;
  name: string;
}
