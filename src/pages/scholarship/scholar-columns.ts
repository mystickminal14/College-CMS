import type { ScholarshipSchedule } from "./model";

export const scholarshipColumns = [
  {
    label: "Year",
    accessor: "scheduleYear" as keyof ScholarshipSchedule,
  },
  {
    label: "Registration Opens",
    accessor: "regisrationOpenDate" as keyof ScholarshipSchedule,
  },
  {
    label: "Last Date",
    accessor: "lastDate" as keyof ScholarshipSchedule,
  },
  {
    label: "Exam Date",
    accessor: "examDate" as keyof ScholarshipSchedule,
  },
  {
    label: "Final Result",
    accessor: "canDate" as keyof ScholarshipSchedule,
  },
  {
    label: "Admission Date",
    accessor: "admissionDate" as keyof ScholarshipSchedule,
  },
];
