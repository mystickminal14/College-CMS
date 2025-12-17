export interface CreateParentPayload {
  session: string;
}

export interface CreateChildPayload {
  parentId: number;
  semester: string;
  course: string;
  intake: string;
  file: string;
}

export interface Planners {
  id?: number;
  parentId?: number;
  semester?: string;
  course?: string;
  intake?: string;
  session?: string;
  file?: string;
  children?: Planners[];
}

export interface BulkChildPayload {
  parentId: number;
  records: {
    semester: string;
    course: string;
    intake: string;
  }[];
  files: File[];
}
