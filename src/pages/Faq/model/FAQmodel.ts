export type EStatus = "ENABLED" | "DISABLED";

export interface FAQ {
  id: number;
  questions: string;
  answers: string;
  parentId: number | null;
  order: number;
  status: EStatus;
  createdAt: string;
  updatedAt: string;
  children?: FAQ[];
}