export type Gender = "MALE" | "FEMALE" | "OTHER";
export type MaritalStatus = "SINGLE" | "MARRIED" | "OTHER";
export type VacancySource = "COMPANY_WEBSITE" | "SOCIAL_MEDIA" | "EMPLOYEE_REFERRAL" | "JOB_PORTAL" | "OTHER";
export type ApplicationStatus = "PENDING" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "HIRED";

export interface JobApplication {
  id: string;
  vacancyId: string;
  vacancy?: {
    designation: string;
    location: string;
  };
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  nationality: string;
  highestQualification: string;
  professionalCertifications?: string | null;
  maritalStatus: MaritalStatus;
  currentAddress: string;
  contactNumber: string;
  heardFrom: VacancySource;
  heardFromOther?: string | null;
  resumeUrl?: string | null;
  applicationStatus?: ApplicationStatus | null;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}
