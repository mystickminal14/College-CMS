import type { Dept } from "./model/DeptModel";

export const DeptColumns = [
 
  {
    label: " Name",
    accessor: "title",
    render: (row: Dept) => `${row.name}`
  },
  { label: "Status", accessor: "status" },
  { label: "Order", accessor: "order" },


];
