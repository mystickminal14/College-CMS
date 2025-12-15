import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import Pagination from "../../utils/Pagination";
import DeleteDownloadsModal from "./components/DeleteModel";
import type { Downloads } from "./model/handbookModel";
import useGetDownloads from "./hooks/useGetAll";
import { PAGE_LIMIT } from "../../constants";
import DownloadsCardView from "./components/DownloadCardView";
import DownloadPdfUploadForm from "./components/Wizard";
import { useUpdatefile } from "./hooks/useUpdateImage";
import { FaTable, FaThLarge } from "react-icons/fa";
import EnhancedTable from "../../template/EnhancedTable";
import { Trash2 } from "lucide-react";
import { DownloadsColumns } from "./utils/columns";

const DownloadsPage = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [DownloadsToDelete, setDownloadsToDelete] = useState<Downloads | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "card">("card");

  const { data, isLoading, isError } = useGetDownloads({ page, limit: PAGE_LIMIT });
  const updateFileMutation = useUpdatefile();

  const Downloads = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleDelete = (item: Downloads) => {
    setDownloadsToDelete(item);
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
      <TitleBox title="Downloads Management" subtitle="Manage application downloads (PDF only)" />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 cursor-pointer flex items-center space-x-1 transition-colors rounded ${viewMode === "table"
              ? "bg-linear-to-r from-[#1a7cd3] to-[#1a7cd3] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Table</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 flex cursor-pointer items-center space-x-1 transition-colors rounded ${viewMode === "card"
              ? "bg-linear-to-r from-[#1a7cd3] to-[#1a7cd3] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <FaThLarge className="w-4 h-4" />
            <span>Cards</span>
          </button>
        </div>
       <button
          onClick={handleAdd}
          className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Downloads</span>
        </button>
      </div>
      <div>
        {viewMode === "table" ? (
          <EnhancedTable
            data={Downloads}
            columns={DownloadsColumns}
            actions={tableActions}
            loading={isLoading}
            emptyMessage={isError ? "Failed to load Teams" : "No Teams found"}
          />
        ) : (
          <DownloadsCardView
            downloads={Downloads}
            isLoading={isLoading}
            isError={isError}
            onDelete={handleDelete}
          />
        )}
      </div>


      <Pagination hasNextPage={hasNextPage} page={page} totalPages={totalPages} onPageChange={setPage} />

      <DeleteDownloadsModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        Downloads={DownloadsToDelete}
      />

      <DownloadPdfUploadForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        updateFileMutation={updateFileMutation}
      />
    </div>
  );
};

export default DownloadsPage;
