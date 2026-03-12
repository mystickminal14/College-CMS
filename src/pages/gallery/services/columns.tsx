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
  {
    label: "Gallery year",
    accessor: "year",
    render: (row: GalleryType) => `${row.year} `
  },
  {
    label: "Gallery month",
    accessor: "month",
    render: (row: GalleryType) => `${row.month} `
  },
  {
    label: "Gallery day",
    accessor: "day",
    render: (row: GalleryType) => `${row.day} `
  },

];
