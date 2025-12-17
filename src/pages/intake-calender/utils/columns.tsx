import type { Intakes } from "../model/IntakeModel";

export const NIntakesModelColumns = [
  { label: "Intake", accessor: "intake" },
  { label: "Duration", accessor: "duration" },
  {
    label: "Status",
    accessor: "status",
    render: (row: Intakes) => {
      const isOpen = row.status === "OPEN";
      const buttonClass = isOpen ? "bg-blue-500 text-white" : "bg-red-500 text-white";
      return (
        <button className={`px-3 py-1 rounded ${buttonClass}`}>
          {row.status}
        </button>
      );
    },
  },
];
