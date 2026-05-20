import { IMAGE_URL } from "../../../../constants";
import type { JobVacancy } from "../model/VacancyModel";

export const VacancyColumns = [
  { label: "Designation", accessor: "designation" },
  { label: "Location", accessor: "location" },
  { label: "Timings", accessor: "timings" },
  {
    label: "Employment",
    accessor: "employmentType",
    render: (row: JobVacancy) => row.employmentType ?? <span className="text-gray-400 italic">—</span>,
  },
  {
    label: "Applications",
    accessor: "_count",
    render: (row: JobVacancy) => (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
        {row._count?.applications ?? 0}
      </span>
    ),
  },
  {
    label: "Status",
    accessor: "status",
    render: (row: JobVacancy) => (
      <span
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
          row.status === "OPEN"
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    label: "Poster",
    accessor: "posterUrl",
    render: (row: JobVacancy) =>
      row.posterUrl ? (
        <img
          src={IMAGE_URL + row.posterUrl}
          alt="poster"
          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
        />
      ) : (
        <span className="text-gray-400 italic text-sm">No poster</span>
      ),
  },
];
