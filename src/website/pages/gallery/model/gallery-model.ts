export interface GalleryImage {
  id: number;
  typeId: number;
  image: string | null;
  link: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryType {
  id: number;
  name: string;
}

export interface GalleryGroup {
  type: GalleryType;
  images: GalleryImage[];
}
