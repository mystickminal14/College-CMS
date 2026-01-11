export interface GalleryType {
  id: number;
  name: string;
  slug: string;
  status:STATUS;
  createdAt: string;
}

export interface Gallerys {
  id?: number;
  image?: string | null;
  link?: string | null;
  typeId: number;
  type?: GalleryType;
  createdAt?: string;
}
export type STATUS = "ENABLED" | "DISABLED";
