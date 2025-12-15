export interface Notices {
  id?: number;
  program_name?: string;
  date?: string;
  title?: string;
  type: ENotice;
  file?: string;
}


export type ENotice = "ADMINISTRATIVE" | "ACADEMIC" ;
