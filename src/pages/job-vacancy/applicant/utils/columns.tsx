import { IMAGE_URL } from "../../../../constants";
import type { ApplicationStatus, JobApplication } from "../model/ApplicantModel";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  REVIEWED: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  SHORTLISTED: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  HIRED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

export const ApplicantColumns = [
  { label: "Full Name", accessor: "fullName" },
  { label: "Email", accessor: "email" },
  { label: "Phone", accessor: "phone" },
  {
    label: "Gender",
    accessor: "gender",
    render: (row: JobApplication) =>
      row.gender.charAt(0) + row.gender.slice(1).toLowerCase(),
  },
  {
    label: "Position",
    accessor: "vacancy",
    render: (row: JobApplication) =>
      row.vacancy?.designation ?? <span className="text-gray-400 italic">—</span>,
  },
  {
    label: "Applied At",
    accessor: "appliedAt",
    render: (row: JobApplication) =>
      new Date(row.appliedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    label: "Resume",
    accessor: "resumeUrl",
    render: (row: JobApplication) =>
      row.resumeUrl ? (
        <button
          onClick={() => window.open(IMAGE_URL + row.resumeUrl, "_blank")}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition cursor-pointer"
        >
          View
        </button>
      ) : (
        <span className="text-gray-400 italic text-sm">None</span>
      ),
  },
  {
    label: "Status",
    accessor: "applicationStatus",
    render: (row: JobApplication) => {
      const status = row.applicationStatus as ApplicationStatus | null;
      if (!status) return <span className="text-gray-400 italic text-sm">—</span>;
      return (
        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[status]}`}>
          {status}
        </span>
      );
    },
  },
];
