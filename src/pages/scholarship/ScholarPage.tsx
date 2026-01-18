import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import { Edit } from "lucide-react";
import type { ScholarshipSchedule } from "./model";
import useGetScholarship from "./hooks/useGet";
import useEditScholarship from "./hooks/useUpdate";
import { scholarshipColumns } from "./scholar-columns";
import EditScholarshipModal from "./EditPage";


const ScholarshipPage = () => {
  const [selectedData, setSelectedData] =
    useState<ScholarshipSchedule | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const { data, isLoading,  } = useGetScholarship();
  const editMutation = useEditScholarship();

  const tableData = data?.data ? [data.data] : [];

  const handleEdit = (row: ScholarshipSchedule) => {
    setSelectedData(row);
    setShowEditModal(true);
  };

  const actions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Schedule",
      onClick: handleEdit,
      color: "text-blue-600 hover:bg-blue-600 hover:text-white",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox
        title="ICT Scholarship"
        subtitle="Manage National ICT Scholarship dates"
      />

      <div className="mt-3">
        <EnhancedTable
        data={tableData}
        columns={scholarshipColumns}
        actions={actions}
        loading={isLoading}
       
      />
      </div>

      <EditScholarshipModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        data={selectedData}
        mutation={editMutation}
      />
    </div>
  );
};

export default ScholarshipPage;
