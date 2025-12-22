import type { Documents } from "../model/DocsModel";

export const DocumentsColumns = [
  
  { label: "Document Required", accessor: "document" },
  { label: "Type", accessor: "type" ,  render: (row: Documents) => `${row.type.toLowerCase()} `},

];
