import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import { Edit, Trash2, Eye,  } from "lucide-react";
import AddEditIntakeWizardModal from "./components/IntakeModal";
import type { Intakes } from "./model/IntakeModel";
import useGetIntakes from "./hooks/useGetAllIntakr";
import useCreateIntakes from "./hooks/useCreate";
import useEditIntakes from "./hooks/useEdit";
import { NIntakesModelColumns } from "./utils/columns";
import DeleteIntakes from "./components/DeleteIntake";
import { FaTable, FaThLarge } from "react-icons/fa";
import IntakesCardView from "./components/CardView";
import ToggleLastDateModal from "./components/ToggleLastDate";

const IntakePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [intakeToEdit, setIntakeToEdit] = useState<Intakes | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const { data, isLoading, isError } = useGetIntakes();
  const createMutation = useCreateIntakes();
  const editMutation = useEditIntakes();

  const intake = data?.data ?? [];

  const handleAdd = () => {
    setIntakeToEdit(null);
    setShowModal(true);
  };

  const handleEdit = (item: Intakes) => {
    setIntakeToEdit(item);
    setShowModal(true);
  };

  const handleDeleteIntake = (item: Intakes) => {
    setIntakeToEdit(item);
    setShowDeleteModal(true);
  };

  const handleToggleLastDate = (item: Intakes) => {
    setIntakeToEdit(item);
    setShowToggleModal(true);
  };

  const tableActions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Intake",
      onClick: handleEdit,
      color: "text-[#1a7cd3] hover:bg-[#1a7cd3] hover:text-white",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      tooltip: "Toggle Last Date Visibility",
      onClick: handleToggleLastDate,
      color: "text-yellow-600 hover:bg-yellow-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Intake",
      onClick: handleDeleteIntake,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Intake Management" subtitle="Manage intakes... " />

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
          onClick={handleAdd}
          disabled={createMutation.isPending}
          className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] 
                     flex items-center space-x-2 shadow hover:shadow-md transition-all 
                     duration-200 font-medium w-full md:w-auto justify-center 
                     disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Intakes</span>
        </button>
      </div>

      {viewMode === "table" ? (
        <EnhancedTable
          data={intake}
          columns={NIntakesModelColumns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={isError ? "Failed to load intake" : "No intake found"}
        />
      ) : (
        <IntakesCardView
          intakes={intake}
          isLoading={isLoading}
          isError={isError}
          onDelete={handleDeleteIntake}
        />
      )}

      <DeleteIntakes
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        Intakes={intakeToEdit}
      />

      <ToggleLastDateModal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        intake={intakeToEdit}
      />

      <AddEditIntakeWizardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        IntakesToEdit={intakeToEdit}
        createMutation={createMutation}
        editMutation={editMutation}
      />
    </div>
  );
};

export default IntakePage;