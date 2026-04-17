// src/models/alumni.model.ts

export const EPrefix = {
  MR: 'MR',
  MS: 'MS',
} as const;

export const EStudyMode = {
  MORNING: 'MORNING',
  DAY: 'DAY',
  EVENING: 'EVENING',
  WEEKEND: 'WEEKEND',
} as const;

export const EStatus = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',

} as const

export type EPrefixType = keyof typeof EPrefix; // "MR" | "MS"
export type EStudyModeType = keyof typeof EStudyMode; // "MORNING" | "DAY" | "EVENING" | "WEEKEND"
export type EStatusType = keyof typeof EStatus; // "ENABLED" | "DISABLED"

export interface AlumniFormData {
  id?: number;
  collegeRollNo: string;
  content: string;
  uniRollNo: string;
  prefix: EPrefixType;
  fullName: string;
  degree: string;
  yearOfPassing: string;
  mode: EStudyModeType;
  email: string;
  mobileNo: string;
  presentEmployer?: string;
  designation?: string;
  presentCountry?: string;
  registrationDate?: string;
  status?: EStatusType; // ✅ include status for API & forms
  createdAt?: string;
  updatedAt?: string;
}
