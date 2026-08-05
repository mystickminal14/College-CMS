import type { NoticeType } from "../../notice-type/model/NoticeTypeModel";

export interface Notices {
  id?: number;
  program_name?: string;
  date?: string;
  title?: string;
  typeId?: number;
  type?: NoticeType | null;
  file?: string;
}

export type { NoticeType };
