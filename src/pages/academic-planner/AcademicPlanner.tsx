import { useState} from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import { Edit, Trash2, Eye } from "lucide-react";
import useGetPlannerParents from "./hooks/useGetPlannerParents";
import type { Planners } from "./model/PlannerModel";
import CreateEditSessionModal from "./components/CreateParent";
import CreateMultipleFilesModal from "./components/CreateMultiple";
import DeletePlannerModal from "./components/DeletePlanner";
import ViewChildrenModal from "./components/ViewTable";
import { FaTable, FaThLarge } from "react-icons/fa";
import CardView from "./components/GirdCard";

const PlannersPage = () => {
  const [showParentModal, setShowParentModal] = useState(false);
  const [showChildrenModal, setShowChildrenModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewChildrenModal, setShowViewChildrenModal] = useState(false);

  const [plannersToEdit, setPlannersToEdit] = useState<Planners | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

  const { data, isLoading, isError } = useGetPlannerParents();
  const planners = data?.data ?? [];

  // ---------------- Handlers ----------------
  const handleAddParent = () => {
    setPlannersToEdit(null);
    setShowParentModal(true);
  };

  const handleEditParent = (planner: Planners) => {
    setPlannersToEdit(planner);
    setShowParentModal(true);
  };

  const handleAddChildren = (planner: Planners) => {
    console.log("Opening children modal for planner ID:", planner.id);
    setPlannersToEdit(planner);
    setShowChildrenModal(true);
  };

  const handleDelete = (planner: Planners) => {
    setPlannersToEdit(planner);
    setShowDeleteModal(true);
  };

  const handleViewChildren = (planner: Planners) => {
    if (!planner.id) return;
    setSelectedParentId(planner.id);
    setShowViewChildrenModal(true);
  };

  const tableActions = [
    {
      icon: <Eye className="w-5 h-5" />,
      tooltip: "Add Academic Planner",
      onClick: handleAddChildren,
      color: "text-green-600 hover:bg-green-600 hover:text-white",
    },
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Planner",
      onClick: handleEditParent,
      color: "text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Planner",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  // ---------------- Table Columns ----------------
  const columns = [
    { label: "Session", accessor: "session" },
    {
      label: "View Children",
      accessor: "actions" as keyof Planners,
      render: (row: Planners) => (
        <button
          onClick={() => handleViewChildren(row)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View
        </button>
      ),
    },
  ];

  // ---------------- View Mode ----------------
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Academic Planners Management" subtitle="Manage application planners" />

      {/* Header Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${
              viewMode === "table"
                ? "bg-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Table</span>
          </button>

          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${
              viewMode === "card"
                ? "bg-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaThLarge className="w-4 h-4" />
            <span>Cards</span>
          </button>
        </div>

        <button
          onClick={handleAddParent}
          className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] 
                     flex items-center space-x-2 shadow hover:shadow-md transition-all 
                     duration-200 font-medium w-full md:w-auto justify-center 
                     disabled:opacity-50"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Intakes</span>
        </button>
      </div>

      {/* Planners List */}
      {viewMode === "table" ? (
        <EnhancedTable
          data={planners}
          columns={columns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={isError ? "Failed to load planners" : "No planners found"}
        />
      ) : (
        <CardView
          planners={planners}
          onEdit={handleEditParent}
          onDelete={handleDelete}
          onAddMultiple={handleAddChildren}
          onViewChildren={handleViewChildren}
        />
      )}

      {/* Modals */}
      <CreateEditSessionModal
        isOpen={showParentModal}
        onClose={() => setShowParentModal(false)}
        initialSession={plannersToEdit?.session}
        sessionId={plannersToEdit?.id}
      />

      {/* Add key prop to force re-render when parentId changes */}
      {showChildrenModal && (
        <CreateMultipleFilesModal
          key={`multiple-modal-${plannersToEdit?.id || 'new'}`}
          isOpen={showChildrenModal}
          onClose={() => setShowChildrenModal(false)}
          parentId={plannersToEdit?.id ?? 0}
          onSuccess={() => {
            // You might want to refresh the data here
            console.log("Multiple files added successfully");
          }}
        />
      )}

      <DeletePlannerModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        planner={plannersToEdit}
        type="PARENT"
      />

      <ViewChildrenModal
        isOpen={showViewChildrenModal}
        onClose={() => setShowViewChildrenModal(false)}
        parentId={selectedParentId ?? 0}
      />
    </div>
  );
};

export default PlannersPage;