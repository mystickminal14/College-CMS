
export interface Course {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}


export interface AcademicYear {
  id: number;
  year: string;
  session: string;
  createdAt: string;
  updatedAt: string;
}


export interface AcademicPlanner {
  id: number;
  semester: string;
  intake: string;
  file: string;

  plannerCourseId: number;
  academicYearId: number;

  createdAt: string;
  updatedAt: string;

  academicYear: AcademicYear;
  plannerCourse: Course;
}


// PlannerModel.ts
export interface CreateAcademicYearPayload {
  year: string;
  session: string;
}

export interface UpdateAcademicYearPayload {
  id: number;
  year: string;
  session: string;
}

export interface CreatePlannerPayload {
   semester: string;
  intake: string;
  file: string;
  plannerCourseId: number;
  academicYearId: number;
}
export interface EditPlannerPayload {
  id:number;
   semester: string;
  intake: string;
  file: string;
  plannerCourseId: number;
  academicYearId: number;
}
