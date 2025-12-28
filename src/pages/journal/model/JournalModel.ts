export interface CreateParentPayload {
  issue: string;
  year: string;

}

export interface CreateChildPayload {
  parentId: number;
  volume: string;
  month: string;
}

export interface Journals {
  id?: number;
  parentId?: number;
  issue?: string;
  year?: string;
  volume?: string;
  month?: string;
   children?: Journals[]; 
}
export interface EditParentJournalPayload {
  id: number;                       
  journal: Partial<CreateParentPayload>;
}
export interface EditChildJournalPayload {
  id: number;                       
  journal: Partial<CreateChildPayload>; 
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