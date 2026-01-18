import type { GalleryType } from "../model/GallModel";

export const TypeColumns = [
 
  {
    label: "Gallery type",
    accessor: "title",
    render: (row: GalleryType) => `${row.name} `
  },

  {
    label: "Gallery status",
    accessor: "status",
    render: (row: GalleryType) => `${row.status} `
  },
];
