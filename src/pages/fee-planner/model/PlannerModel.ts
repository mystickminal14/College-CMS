export interface CreateParentPayload {
  session: string;
}

export interface CreateChildPayload {
  parentId: number;
  semester: string;
  course: string;
  file: string;
}

export interface Planners {
  id?: number;
  parentId?: number;
  semester?: string;
  course?: string;
  session?: string;
  file?: string;
  children?: Planners[];
}

export interface BulkChildPayload {
  parentId: number;
  records: {
    semester: string;
    course: string;
  }[];
  files: File[];
}
