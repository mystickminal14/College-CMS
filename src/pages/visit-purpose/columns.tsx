import type { VisitPurpose } from "./model/VisitPurposeModel";

export const VisitPurposeColumns = [
  {
    label: "Name",
    accessor: "name",
    render: (row: VisitPurpose) =>
      row.isOther ? `${row.name} (system)` : row.name,
  },
  { label: "Status", accessor: "status" },
  { label: "Order", accessor: "order" },
];
