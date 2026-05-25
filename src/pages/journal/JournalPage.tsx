import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import { Edit, Trash2, Eye } from "lucide-react";
import type { Journals } from "./model/JournalModel";
import CreateEditParentJournalModal from "./components/CreateParent";
import DeleteJournalModal from "./components/DeleteJournal";
import { PAGE_LIMIT } from "../../constants";
import useGetJournal from "./hooks/useGetParent";
import { useNavigate } from "react-router-dom";

const JournalsPage = () => {
  const [showParentModal, setShowParentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState(1);

  const [journalsToEdit, setJournalsToEdit] = useState<Journals | null>(null);

  const { data, isLoading, isError } = useGetJournal({
    page,
    limit: PAGE_LIMIT,
  });

  const journals = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  // ---------------- Handlers ----------------
  const handleAddParent = () => {
    setJournalsToEdit(null);
    setShowParentModal(true);
  };

  const handleEditParent = (journal: Journals) => {
    setJournalsToEdit(journal);
    setShowParentModal(true);
  };

  const handleDelete = (journal: Journals) => {
    setJournalsToEdit(journal);
    setShowDeleteModal(true);
  };
const navigate=useNavigate();
 const handleView = (child: Journals) => {
    if (!child.id) return;
    navigate(`/app/media/journals/${child.id}`, {
      state: { volume: child.volume, issue: child.issue },
    });
  };

  // ---------------- Table Actions ----------------
  const tableActions = [
    {
      icon: <Eye className="w-5 h-5" />,
      tooltip: "View Details",
      onClick: handleView,
      color: "text-green-600 hover:bg-green-600 hover:text-white",
    },
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Journal",
      onClick: handleEditParent,
      color: "text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Journal",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  const columns = [
    { label: "Volume", accessor: "volume" },

    { label: "Issue", accessor: "issue" },
    { label: "Month", accessor: "month" },
    
    { label: "Year", accessor: "year" },
  
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-2 md:p-4">
      <TitleBox title="Academic Journals Management" subtitle="Manage journals" />

      {/* Header Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
      

        <button
          onClick={handleAddParent}
          className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Journal Issue</span>
        </button>
      </div>

      {/* Table */}
      <EnhancedTable
        data={journals}
        columns={columns}
        actions={tableActions}
        loading={isLoading}
        emptyMessage={isError ? "Failed to load journals" : "No journals found"}
      />

      {/* Pagination */}
      <Pagination page={page} hasNextPage={hasNextPage} totalPages={totalPages} onPageChange={setPage} />

      {/* Modals */}
      <CreateEditParentJournalModal
        isOpen={showParentModal}
        onClose={() => setShowParentModal(false)}
        initialData={
          journalsToEdit
            ? {  year: journalsToEdit.year ?? "" ,issue: journalsToEdit.issue ?? "", volume: journalsToEdit.volume ?? "", month: journalsToEdit.month ?? "" }
            : undefined
        }
        journalId={journalsToEdit?.id}
      />

      <DeleteJournalModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        journal={journalsToEdit}
      />

    
    </div>
  );
};

export default JournalsPage;
