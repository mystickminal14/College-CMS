import type { NoticeType } from "./model/NoticeTypeModel";

export const NoticeTypeColumns = [
  {
    label: "Name",
    accessor: "name",
    render: (row: NoticeType) => `${row.name}`,
  },
  { label: "Status", accessor: "status" },
  { label: "Order", accessor: "order" },
];
