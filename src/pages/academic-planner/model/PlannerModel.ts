export interface CreateParentPayload {
  session: string;
  year:string;
}

export interface CreateChildPayload {
  parentId: number;
  semester: string;
  plannerCourseId: number;
  intake: string;
  file: string;
}

interface course{
  id:number;
  name:string;
}
export interface Planners {
  id?: number;
  parentId?: number;
  semester?: string;
  plannerCourseId?: number;
  year?:string;
 plannerCourse?:course;
  intake?: string;
  session?: string;
  file?: string;
  children?: Planners[];
}

export interface BulkChildPayload {
  parentId: number;
  records: {
    semester: string;
    plannerCourseId: number|undefined;
    intake: string;
  }[];
  files: File[];
}
