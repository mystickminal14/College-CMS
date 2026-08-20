import type { Visitor } from "./model/VisitorModel";

const formatTime = (value?: string | null) => {
  if (!value) return "--";
  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const VisitorColumns = [
  { label: "Name", accessor: "name" },
  { label: "Phone", accessor: "phone" },
  {
    label: "Purpose",
    accessor: "purpose",
    render: (row: Visitor) =>
      row.purpose?.isOther ? row.otherPurpose || "Other" : row.purpose?.name ?? "--",
  },
  // Both are optional on the record, so they render a dash rather than blank.
  {
    label: "Department",
    accessor: "department",
    render: (row: Visitor) => row.department || "--",
  },
  {
    label: "Person to Meet",
    accessor: "personToMeet",
    render: (row: Visitor) => row.personToMeet || "--",
  },
  {
    label: "In Time",
    accessor: "inTime",
    render: (row: Visitor) => formatTime(row.inTime),
  },
  {
    label: "Out Time",
    accessor: "outTime",
    render: (row: Visitor) => formatTime(row.outTime),
  },
  {
    label: "Status",
    accessor: "status",
    render: (row: Visitor) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === "IN"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {row.status === "IN" ? "Inside" : "Checked Out"}
      </span>
    ),
  },
];
