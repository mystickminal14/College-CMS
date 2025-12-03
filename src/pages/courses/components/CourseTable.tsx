import { FaEdit, FaTrash } from "react-icons/fa";
import type { CourseModel } from "../model/CourseModel";
import CustomTable from "../../../components/table/TableComponent";

const CoursesTableView = ({
  courses,
  onEdit,
  onDelete
}: {
  courses: CourseModel[];
  onEdit: (c: CourseModel) => void;
  onDelete: (id: string) => void;
}) => {
  
  const columns = [
    { label: "Code", accessor: "code" },
    {
      label: "Title",
      accessor: "title",
      render: (row: CourseModel) => (
        <div>
          <div className="font-semibold">{row.title}</div>
          <p className="text-sm text-slate-500 dark:text-slate-300 truncate max-w-xs">
            {row.description}
          </p>
        </div>
      )
    },
    { label: "Instructor", accessor: "instructor" },
    { label: "Semester", accessor: "semester" },
    {
      label: "Credits",
      accessor: "credits",
      render: (row: CourseModel) => (
        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
          {row.credits} credits
        </span>
      )
    },
    {
      label: "Enrolled",
      accessor: "enrolled",
      render: (row: CourseModel) => (
        <div className="flex items-center space-x-2">
          <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${(row.enrolled / row.capacity) * 100}%` }}
            />
          </div>
          <span className="text-sm">{row.enrolled}/{row.capacity}</span>
        </div>
      )
    },
    {
      label: "Status",
      accessor: "status",
      render: (row: CourseModel) => {
        const colors = {
          active: "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300",
          inactive: "bg-red-100 text-red-700 dark:bg-red-800/40 dark:text-red-300",
          upcoming: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/40 dark:text-yellow-300"
        };

        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[row.status]}`}>
            {row.status}
          </span>
        );
      }
    }
  ];

  const actions = [
    {
      icon: <FaEdit className="w-4 h-4" />,
      tooltip: "Edit Course",
      onClick: (row: CourseModel) => onEdit(row),
      color: "text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30"
    },
    {
      icon: <FaTrash className="w-4 h-4" />,
      tooltip: "Delete Course",
      onClick: (row: CourseModel) => onDelete(row.id),
      color: "text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
    }
  ];

  return <CustomTable data={courses} columns={columns} actions={actions} />;
};

export default CoursesTableView;
