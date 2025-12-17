export interface Intakes {
  id?: number; 
  intake?: string;
  lastdate?: string;
  duration?: string;
  status?: IntakeStatus;
}
export type IntakeStatus = "OPEN" | "CLOSED";
