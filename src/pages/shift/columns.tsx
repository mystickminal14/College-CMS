import type { Shift } from "./model/ShiftModel";

export const ShiftColumns = [
  {
    label: "Name",
    accessor: "name",
    render: (row: Shift) => `${row.name}`,
  },
  { label: "Status", accessor: "status" },
  { label: "Order", accessor: "order" },
];
