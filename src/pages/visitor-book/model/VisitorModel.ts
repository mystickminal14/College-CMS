export type EVisitorStatus = "IN" | "OUT";

export interface Visitor {
  id?: number;
  name: string;
  phone: string;
  numberOfPerson?: number;
  // A plain string, not a foreign key: the API keeps no purpose table, so this
  // is the reason the visitor picked or, for "Other", the words they typed.
  purpose: string;
  // Optional — a visitor may not know, or may not need, anyone in particular.
  personToMeet?: string | null;
  visitedDate?: string;
  inTime?: string | null;
  outTime?: string | null;
  status?: EVisitorStatus;
  note?: string | null;
  attachment?: string | null;
  qrToken?: string;
  /** Printable visit code (V-2026-0007), added by the API on every row. */
  code?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VisitorsTodaySummary {
  /** The day being summarised — today unless ?date was passed. */
  date: string;
  visitors: Visitor[];
  total: number;
  checkedIn: number;
  checkedOut: number;
}

// The public register endpoint returns only the token, never the row id.
export interface KioskRegistration {
  qrToken: string;
}

export interface VisitorPass {
  code: string;
  name: string;
  purpose: string;
  personToMeet: string | null;
  numberOfPerson: number;
  visitedDate: string;
  inTime: string | null;
  outTime: string | null;
  status: EVisitorStatus;
  // Server-only: the captured photo is never packed into the offline QR payload
  // (too large), so it is absent when the pass renders from the URL hash.
  photo?: string | null;
}
