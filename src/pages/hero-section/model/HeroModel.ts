export interface HeroSectionImage {
  id: number;
  thumbnail: string;
  order: number;
  status: HeroStatus;
  createdAt: string;
  updatedAt: string;
}

export type HeroStatus = "ENABLED" | "DISABLED";