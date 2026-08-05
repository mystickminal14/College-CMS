import type { ClassTiming } from "./model/ClassTimingModel";
import { formatTimeRange } from "./utils/format";

export const ClassTimingColumns = [
  {
    label: "Name",
    accessor: "name",
    render: (row: ClassTiming) => `${row.name}`,
  },
  {
    label: "Type",
    accessor: "kind",
    render: (row: ClassTiming) => (
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
          row.kind === "LECTURE"
            ? "bg-blue-100 text-blue-800"
            : "bg-emerald-100 text-emerald-800"
        }`}
      >
        {row.kind === "LECTURE" ? "Lecture" : "Tutorial"}
      </span>
    ),
  },
  {
    label: "Time",
    accessor: "startTime",
    render: (row: ClassTiming) => formatTimeRange(row) || "—",
  },
  {
    label: "Days",
    accessor: "days",
    render: (row: ClassTiming) => row.days || "—",
  },
  { label: "Status", accessor: "status" },
  { label: "Order", accessor: "order" },
];
