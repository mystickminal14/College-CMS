export interface PublicClub {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}

export interface ClubPresident {
  id: number;
  name: string;
  designation: string;
  semester: number | null;
  pastExperiences: string | null;
  linkedIn: string | null;
  image: string | null;
}

export interface PublicClubDetail extends PublicClub {
  mission: string | null;
  vision: string | null;
  joinFormUrl: string | null;
  president: ClubPresident | null;
}

export interface PublicClubMember {
  id: number;
  name: string;
  designation: string;
  pastExperiences: string | null;
  linkedIn: string | null;
  image: string | null;
  isPresident: boolean;
}

export interface PublicClubMembers {
  club: PublicClub;
  members: PublicClubMember[];
}
