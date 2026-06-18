import type { LayoutColumnConfig } from "../../../template/TempleteTypes";
import type { CourseRegistration } from "../model/CourseRegistrationModel";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export const CourseRegistrationColumns: LayoutColumnConfig<CourseRegistration>[] = [
  { accessor: "fullName", label: "Full Name" },
  { accessor: "email", label: "Email" },
  { accessor: "phone", label: "Phone" },
  { accessor: "courseName", label: "Course" },
  {
    accessor: "createdAt",
    label: "Registered On",
    render: (row) => formatDate(row.createdAt),
  },
];
