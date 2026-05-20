export type JobStatus = "OPEN" | "CLOSED";

export interface JobVacancy {
  id: string;
  designation: string;
  description?: string | null;
  status: JobStatus;
  applicationStartDate: string;
  applicationEndDate?: string | null;
  location: string;
  timings: string;
  posterUrl?: string | null;
  salary?: string | null;
  employmentType?: string | null;
  experienceRequired?: string | null;
  _count?: { applications: number };
  createdAt: string;
  updatedAt: string;
}

export interface CreateVacancyPayload {
  designation: string;
  description?: string;
  status?: JobStatus;
  applicationStartDate: string;
  applicationEndDate?: string | null;
  location: string;
  timings: string;
  salary?: string;
  employmentType?: string;
  experienceRequired?: string;
}
