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

/**
 * Union types derived from constants
 */
export type EPrefixType = typeof EPrefix[keyof typeof EPrefix];
export type EStudyModeType = typeof EStudyMode[keyof typeof EStudyMode];

export interface AlumniFormData {
  collegeRollNo: string;
  UniRollNo: string;
  prefix: EPrefixType;
  fullName: string;
  degree: string;
  yearOfPassing: string; // string for input handling
  mode: EStudyModeType;
  email: string;
  mobileNo: string;
  presentEmployer?: string;
  designation?: string;
  presentCountry?: string;
}
