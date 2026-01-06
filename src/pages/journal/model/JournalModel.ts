export interface CreateParentPayload {
  issue: string;
  year: string;
  volume: string;
  month: string;
}

export interface Journals {
  id?: number;
  issue?: string;
  year?: string;
  volume?: string;
  month?: string;
}
export type JournalsGroupedByYear = Record<string, Journals[]>;

export interface JournalsGroupedResponse {
  statusCode: number;
  data: JournalsGroupedByYear;
  message: string;
  success: boolean;
}
export interface EditParentJournalPayload {
  id: number;                       
  journal: Partial<CreateParentPayload>;
}
export interface EditChildJournalPayload {
  id: number;                       
  journal: Partial<CreateParentPayload>; 
}
export interface JournalDetailsPayload {
  journalId?: number;       
  id?: number;
  title?: string;         
  authors?: string[];   
  pages?: string;          
  subject?: string;        
  country?: string;        
  abstract?: string;       
  availableOnline?: string;   
  keywords?: string[];    
  link?: string;           
}
/* ✅ THIS IS REQUIRED FOR EDIT */
export interface EditJournalDetailsPayload {
  id: number;
  journal: Partial<JournalDetailsPayload>;
}