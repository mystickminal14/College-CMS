export interface FeeYear {
  id: number;
  year: string;
  session: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeePlanner {
  id: number;
  semester: string;
  course: string;
  file: string;
  feeYearId: number;
  createdAt: string;
  updatedAt: string;
  feeYear: FeeYear;
}

export interface CreateFeeYearPayload {
  year: string;
  session: string;
}

export interface UpdateFeeYearPayload {
  id: number;
  year: string;
  session: string;
}

export interface CreatePlannerPayload {
  semester: string;
  course: string;
  file: string;
  feeYearId: number;
}
export interface EditPlannerPayload {
  id: number;
  semester: string;
  course: string;
  file: string;
  feeYearId: number;
}
