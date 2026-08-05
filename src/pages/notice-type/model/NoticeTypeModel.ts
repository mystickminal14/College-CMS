export interface NoticeType {
  id?: number;
  name: string;
  slug?: string;
  order?: number;
  status?: ENoticeTypeStatus;
}

export type ENoticeTypeStatus = "ENABLED" | "DISABLED";

export interface UpdateNoticeTypePayload {
  id: number;
  name: string;
}
