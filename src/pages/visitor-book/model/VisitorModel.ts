import type { VisitPurpose } from "../../visit-purpose/model/VisitPurposeModel";

export type EVisitorStatus = "IN" | "OUT";

export interface Visitor {
  id?: number;
  name: string;
  phone: string;
  numberOfPerson?: number;
  purposeId: number;
  otherPurpose?: string;
  // Stored as plain names rather than foreign keys, and both optional — a
  // visitor may not know the department or the person they need.
  department?: string | null;
  personToMeet?: string | null;
  visitedDate?: string;
  inTime?: string | null;
  outTime?: string | null;
  status?: EVisitorStatus;
  note?: string;
  attachment?: string | null;
  qrToken?: string;
  purpose?: VisitPurpose;
}

export interface VisitorsTodaySummary {
  visitors: Visitor[];
  total: number;
  checkedIn: number;
  checkedOut: number;
}

export interface KioskStaff {
  id: number;
  name: string;
  position: string;
  portrait: string | null;
  image: string | null;
  department: { name: string } | null;
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
