export interface Intakes {
  id?: number; 
  intake?: string;
  lastdate?: string;
  duration?: string;
  lastDateStatus?: "ENABLED" | "DISABLED";
  status?: IntakeStatus;
}
export type IntakeStatus = "OPEN" | "CLOSED";
