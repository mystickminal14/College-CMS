import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import Pagination from "../../utils/Pagination";
import DeleteDownloadsModal from "./components/DeleteModel";
import type { Downloads } from "./model/handbookModel";
import useGetDownloads from "./hooks/useGetAll";
import { PAGE_LIMIT } from "../../constants";
import DownloadsCardView from "./components/DownloadCardView";
import DownloadPdfUploadForm from "./components/Wizard";
import { FaPlus, FaTable, FaThLarge } from "react-icons/fa";
import EnhancedTable from "../../template/EnhancedTable";
import { ArrowUp, Pencil, Trash2 } from "lucide-react";
import { DownloadsColumns } from "./utils/columns";
import SearchBox from "./utils/SearchBox";
import { debounce } from "lodash";
import ChangedownloadOrderModal from "./components/ChangeOrder";

const DownloadsPage = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [DownloadsToDelete, setDownloadsToDelete] = useState<Downloads | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [downloadToEdit, setDownloadToEdit] = useState<Downloads | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [downloadToChangeOrder, setDownloadToChangeOrder] = useState<Downloads | null>(null);

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useGetDownloads({
    search: debouncedSearch,
    page,
    limit: PAGE_LIMIT,
  });

  const downloads = data?.data ?? [];
  const totalItems = data?.pagination?.total ?? 0;
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  const handleDelete = (item: Downloads) => {
    setDownloadsToDelete(item);
    setShowDeleteModal(true);
  };

  const tableActions = [
    {
      icon: <Pencil className="w-4 h-4" />,
      tooltip: "Edit",
      onClick: (item: Downloads) => {
        setDownloadToEdit(item);
        setShowEditModal(true);
      },
      color: "text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
    {
      icon: <ArrowUp className="w-4 h-4" />,
      tooltip: "Change Order",
      onClick: (item: Downloads) => {
        setDownloadToChangeOrder(item);
        setShowOrderModal(true);
      },
      color: "text-purple-600",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Downloads Management" subtitle="Manage application downloads (PDF only)" />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 cursor-pointer flex items-center space-x-1 transition-colors rounded ${
              viewMode === "table"
                ? "bg-linear-to-r from-[#1a7cd3] to-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Table</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 flex cursor-pointer items-center space-x-1 transition-colors rounded ${
              viewMode === "card"
                ? "bg-linear-to-r from-[#1a7cd3] to-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaThLarge className="w-4 h-4" />
            <span>Cards</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
          <SearchBox placeholder="Search Documents..." onSearch={handleSearch} />
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div>
        {viewMode === "table" ? (
          <EnhancedTable
            data={downloads}
            columns={DownloadsColumns}
            actions={tableActions}
            loading={isLoading}
            emptyMessage={isError ? "Failed to load downloads" : "No downloads found"}
          />
        ) : (
          <DownloadsCardView
            downloads={downloads}
            isLoading={isLoading}
            isError={isError}
            onDelete={handleDelete}
          />
        )}
      </div>

      <Pagination
        hasNextPage={hasNextPage}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* DELETE MODAL */}
      <DeleteDownloadsModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        Downloads={DownloadsToDelete}
      />

      {/* CHANGE ORDER MODAL */}
      <ChangedownloadOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        download={downloadToChangeOrder}
        maxOrder={totalItems}
      />

      {/* ADD MODAL */}
      <DownloadPdfUploadForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* EDIT MODAL */}
      <DownloadPdfUploadForm
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setDownloadToEdit(null);
        }}
        DownloadsToEdit={downloadToEdit}
      />
    </div>
  );
};

export default DownloadsPage;