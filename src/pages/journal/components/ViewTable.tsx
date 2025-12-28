import { useState } from "react";
import { X, Edit, Trash2, View } from "lucide-react";
import EnhancedTable from "../../../template/EnhancedTable";
import CreateMultipleFilesModal from "./CreateChild";
import useGetJournalChild from "../hooks/useGetIssues";
import type { Journals } from "../model/JournalModel";
import DeleteJournalModal from "./DeleteJournal";
import Pagination from "../../../utils/Pagination";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  parentId: string;
}

const ViewChildrenModal: React.FC<Props> = ({ isOpen, onClose, parentId }) => {
  // ---------------- Hooks ----------------
  const [page, setPage] = useState(1);
  const [selectedChild, setSelectedChild] = useState<Journals | null>(null);
  const [showChildModal, setShowChildModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetJournalChild({
    id: parentId,
    page,
    limit: 10,
  });

  // ---------------- Derived Data ----------------
  const children = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  // ---------------- Handlers ----------------
  const handleAddChild = () => {
    setSelectedChild(null);
    setShowChildModal(true);
  };

  const handleEditChild = (child: Journals) => {
    setSelectedChild(child);
    setShowChildModal(true);
  };

  const handleDelete = (child: Journals) => {
    if (!child.id) return;
    setSelectedChild(child);
    setShowDeleteModal(true);
  };

  const handleView = (child: Journals) => {
    if (!child.id) return;
    navigate(`/app/media/journals/${child.id}`);
  };

  const columns = [
    { label: "Volume", accessor: "volume" },
    { label: "Month", accessor: "month" },
  ];

  const actions = [
    { icon: <Edit className="w-5 h-5" />, tooltip: "Edit", onClick: handleEditChild, color: "text-blue-600 hover:bg-blue-600 hover:text-white" },
    { icon: <Trash2 className="w-5 h-5" />, tooltip: "Delete", onClick: handleDelete, color: "text-red-600 hover:bg-red-600 hover:text-white" },
    { icon: <View className="w-5 h-5" />, tooltip: "View", onClick: handleView, color: "text-green-600 hover:bg-green-600 hover:text-white" },
  ];

  // ---------------- Early return for modal visibility ----------------
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a7cd3] p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Children Journals</h2>
          <button onClick={onClose}>
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          <button onClick={handleAddChild} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-max">
            Add Child Journal
          </button>

          <EnhancedTable
            data={children}
            columns={columns}
            actions={actions}
            loading={isLoading}
            emptyMessage={isError ? "Failed to load children" : "No children found"}
          />

          <Pagination page={page} hasNextPage={hasNextPage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>

      {/* Modals */}
      {showChildModal && (
        <CreateMultipleFilesModal
          isOpen={showChildModal}
          onClose={() => setShowChildModal(false)}
          parentId={Number(parentId)}
          initialData={selectedChild ?? undefined}
        />
      )}

      {showDeleteModal && (
        <DeleteJournalModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          journal={selectedChild}
          type="CHILD"
        />
      )}
    </div>
  );
};

export default ViewChildrenModal;
