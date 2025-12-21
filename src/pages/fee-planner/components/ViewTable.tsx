import React from "react";
import { X, Trash2 } from "lucide-react";
import EnhancedTable from "../../../template/EnhancedTable";
import useDeletePlanner from "../hooks/useDelete";
import type { Planners } from "../model/PlannerModel";
import useGetChildren from "../hooks/useGetChildrens";
import { IMAGE_URL } from "../../../constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  parentId: number;
}

const ViewChildrenModal: React.FC<Props> = ({ isOpen, onClose, parentId }) => {
  const { data, isLoading, isError } = useGetChildren(parentId);
  const deleteMutation = useDeletePlanner();

  if (!isOpen) return null;

  const children = data?.data ?? [];

  const handleDelete = (child: Planners) => {
    if (child.id !== undefined) deleteMutation.mutate({ id: child.id, type: "CHILD" });
  };

  const columns = [
    { label: "Course", accessor: "course" },
    { label: "Semester", accessor: "semester" },
    {
      label: "File",
      accessor: "file",
      render: (row: Planners) =>
        row.file ? (
          <button
            onClick={() => window.open(IMAGE_URL + row.file, "_blank")}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Open File
          </button>
        ) : (
          <span className="text-gray-400">No file</span>
        ),
    },
  ];

  const actions = [
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Child",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-[#1a7cd3] to-[#135EAB] p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">View Children</h2>
          <button onClick={onClose}>
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Table */}
        <div className="p-5">
          <EnhancedTable
            data={children}
            columns={columns}
            actions={actions}
            loading={isLoading}
            emptyMessage={isError ? "Failed to load children" : "No children found"}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewChildrenModal;
