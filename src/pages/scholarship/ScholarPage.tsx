import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import { ArrowUp, Edit } from "lucide-react";
import type { ScholarshipSchedule } from "./model";
import { scholarshipColumns } from "./scholar-columns";
import ScholarshipModal from "./EditPage";
import StatusModal from "./StatusChange";
import { useAddScholarship, useChangeScholarshipStatus, useEditScholarship } from "./hooks/useScholar";
import useGetAllScholar from "./hooks/useGetAll";

const ScholarshipPage = () => {
  const [selectedData, setSelectedData] = useState<ScholarshipSchedule | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusData, setStatusData] = useState<ScholarshipSchedule | null>(null);

  const { data, isLoading } = useGetAllScholar();
    const teams = data?.data ?? [];

  const editMutation = useEditScholarship();
  const addMutation = useAddScholarship();
  const statusMutation = useChangeScholarshipStatus();


  // Open modal for adding new scholarship
  const handleAdd = () => {
    setSelectedData(null);
    setIsAddMode(true);
    setShowModal(true);
  };

  // Open modal for editing existing scholarship
  const handleEdit = (row: ScholarshipSchedule) => {
    setSelectedData(row);
    setIsAddMode(false);
    setShowModal(true);
  };

  // Open status modal
  const handleStatusChange = (row: ScholarshipSchedule) => {
    setStatusData(row);
    setShowStatusModal(true);
  };

  const actions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Schedule",
      onClick: handleEdit,
      color: "text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <ArrowUp className="w-5 h-5" />,
      tooltip: "Change Status",
      onClick: handleStatusChange,
      color: "text-yellow-600 hover:bg-yellow-600 hover:text-white",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="ICT Scholarship" subtitle="Manage National ICT Scholarship dates" />

      <div className="my-3 flex justify-end">
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add</span>
        </button>
      </div>

      <EnhancedTable
        data={teams}
        columns={scholarshipColumns}
        actions={actions}
        loading={isLoading}
      />

      {/* Add/Edit Scholarship Modal */}
      <ScholarshipModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={selectedData}
        mutation={isAddMode ? addMutation : editMutation}
        isAddMode={isAddMode}
      />

      {/* Status Modal */}
      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        data={statusData}
        mutation={statusMutation}
      />
    </div>
  );
};

export default ScholarshipPage;
