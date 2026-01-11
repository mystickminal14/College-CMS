import React from "react";
import { Trash2 } from "lucide-react";
import type { Planners } from "../model/PlannerModel";

interface Props {
  childrenData: Planners[];
  isLoading: boolean;
  onDelete?: (child: Planners) => void;
}

const ChildrenTable: React.FC<Props> = ({ childrenData, isLoading, onDelete }) => {
  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!childrenData || childrenData.length === 0) return <p className="p-4">No children found</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border rounded-xl overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-2 text-left">SN</th>
            <th className="p-2 text-left">Course</th>
            <th className="p-2 text-left">Semester</th>
            <th className="p-2 text-left">Intake</th>
            <th className="p-2 text-left">File</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {childrenData.map((child, i) => (
            <tr key={child.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{child?.plannerCourse?.name??''}</td>
              <td className="p-2">{child.semester}</td>
              <td className="p-2">{child.intake}</td>
              <td className="p-2">
                <a
                  href={child.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View PDF
                </a>
              </td>
              <td className="p-2">
                {onDelete && (
                  <button
                    onClick={() => onDelete(child)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildrenTable;
