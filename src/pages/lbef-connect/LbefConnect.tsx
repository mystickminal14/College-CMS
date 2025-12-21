import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import Pagination from "../../utils/Pagination";
import DeleteConnectsModal from "./components/DeleteModel";
import useGetConnects from "./hooks/useGetAll";
import { PAGE_LIMIT } from "../../constants";
import DownloadPdfUploadForm from "./components/Wizard";
import { FaPlus, } from "react-icons/fa";
import EnhancedTable from "../../template/EnhancedTable";
import { Trash2 } from "lucide-react";
import { useUpdateimageConnect } from "./hooks/useUpdateImage";
import type { Connects } from "./model/Connects";
import { ConnectsColumns } from "./utils/columns";

const ConnectsPage = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [ConnectsToDelete, setConnectsToDelete] = useState<Connects | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useGetConnects({ 
    page, limit: PAGE_LIMIT });
  const updateFileMutation = useUpdateimageConnect();

  const Connects = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleDelete = (item: Connects) => {
    setConnectsToDelete(item);
    setShowDeleteModal(true);
  };
  const tableActions = [

    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Team",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white"
    },
  ];

  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Connects Management" subtitle="Manage application connects (PDF only)" />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
       
          <button
            onClick={() => handleAdd()}
            className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c]  flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add</span>
          </button>
      </div>
      <div>
          <EnhancedTable
            data={Connects}
            columns={ConnectsColumns}
            actions={tableActions}
            loading={isLoading}
            emptyMessage={isError ? "Failed to load Connect" : "No Connect found"}
          />
      
      </div>


      <Pagination hasNextPage={hasNextPage} page={page} totalPages={totalPages} onPageChange={setPage} />

      <DeleteConnectsModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        connect={ConnectsToDelete}
      />

      <DownloadPdfUploadForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        createConnectMutation={updateFileMutation}
      />
    </div>
  );
};

export default ConnectsPage;
