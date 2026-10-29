export type Status = "ENABLED" | "DISABLED";

export interface Club {
  id?: number;
  name: string;
  slug?: string;
  image?: string | null;
  mission?: string | null;
  vision?: string | null;
  joinFormUrl?: string | null;
  order?: number;
  status?: Status;
  _count?: { members: number };
}

export interface ClubName {
  id: number;
  name: string;
}

export interface ClubMember {
  id?: number;
  clubId: number;
  name: string;
  designation: string;
  semester?: number | null;
  pastExperiences?: string | null;
  linkedIn?: string | null;
  image?: string | null;
  isPresident?: boolean;
  order?: number;
  status?: Status;
  club?: ClubName;
}
