import type { CourseCategory } from "./model/CourseCatModel";

export const CourseCategoryColumns = [
 
  {
    label: " Name",
    accessor: "title",
    render: (row: CourseCategory) => `${row.name}`
  },
  { label: "Status", accessor: "status" },
  { label: "Order", accessor: "order" },


];
