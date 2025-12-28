// Editorial member interface
export interface EditorialMember {
  id?: number;
  name: string;
  designation: string;
  honoraryPosition: HonoraryPosition;
  department: string;
  institution: string;
  country: string;
}

export type HonoraryPosition =
  | "CHIEF_PATRON"
  | "PATRON"
  | "EDITOR_IN_CHIEF"
  | "ASSOCIATE_EDITOR"
  | "MANAGING_EDITOR"
  | "EDITORIAL_BOARD_MEMBER"
  | "ADVISOR";

export interface EditorialByHonorary {
  [key: string]: EditorialMember[];
}
