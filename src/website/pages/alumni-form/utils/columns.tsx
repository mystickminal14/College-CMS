import type { AlumniFormData } from "../models/alumniModel";

export const alumniColumns = [
  {
    label: "Full Name",
    accessor: "fullName",
    render: (row: AlumniFormData) =>
      `${row.prefix} ${row.fullName}`,
  },

  {
    label: "College Roll No",
    accessor: "collegeRollNo",
  },

  {
    label: "University Roll No",
    accessor: "uniRollNo",
  },

  {
    label: "Email",
    accessor: "email",
  },

  {
    label: "Mobile No",
    accessor: "mobileNo",
  },

  {
    label: "Status",
    accessor: "status", // ✅ MUST be string
    render: (row: AlumniFormData) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === "ENABLED"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];
