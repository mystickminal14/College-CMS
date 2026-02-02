export interface ScholarshipSchedule {
  id: number;
  scheduleYear: string;
  regisrationOpenDate: string;
  lastDate: string;
  examDate: string;
  canDate: string;
  admissionDate: string;
  createdAt?: string;
  status?: ScholarStatus
  updatedAt?: string;
}
export type ScholarStatus = "OPEN" | "CLOSED" ;
