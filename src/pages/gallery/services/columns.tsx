import type { GalleryType } from "../model/GallModel";

export const TypeColumns = [
 
  {
    label: "Gallery type",
    accessor: "title",
    render: (row: GalleryType) => `${row.name} `
  },


];
