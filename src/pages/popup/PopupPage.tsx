import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import { PAGE_LIMIT } from "../../constants";
import Pagination from "../../utils/Pagination";
import useGetPopups from "./hooks/useGetPopups";
import useAddPopup from "./hooks/useAddPopup";
import useUpdatePopup from "./hooks/useUpdatePopup";
import type { Popup } from "./model/PopupModel";
import PopupCardView from "./components/PopupCard";
import AddPopupModal from "./components/AddPopupModal";
import UpdatePopupModal from "./components/UpdatePopupModal";
import TogglePopupStatusModal from "./components/TogglePopupStatusModal";
import DeletePopupModal from "./components/DeletePopupModal";

const PopupPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);

  const [selectedPopup, setSelectedPopup] = useState<Popup | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useGetPopups({ page, limit });

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const popups = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const openCount = popups.filter((p) => p.status === "OPEN").length;

  const addMutation = useAddPopup();
  const updateMutation = useUpdatePopup();

  const handleEdit = (popup: Popup) => {
    setSelectedPopup(popup);
    setShowEditModal(true);
  };

  const handleToggle = (popup: Popup) => {
    setSelectedPopup(popup);
    setShowToggleModal(true);
  };

  const handleDelete = (popup: Popup) => {
    setSelectedPopup(popup);
    setShowDeleteModal(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Popup" subtitle="Manage the site popup (only one can be open at a time)" />

      {/* ── Toolbar ── */}
      <div className="flex justify-between items-center my-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
            {openCount} Open
          </span>
          <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">
            {total} Total
          </span>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          disabled={addMutation.isPending}
          className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Add Popup</span>
        </button>
      </div>

      {/* ── Cards ── */}
      <PopupCardView
        popups={popups}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleEdit}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      <Pagination
        hasNextPage={hasNextPage}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={handleLimitChange}
        total={total}
      />

      {/* ── Modals ── */}
      <AddPopupModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} mutation={addMutation} />

      <UpdatePopupModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        popup={selectedPopup}
        mutation={updateMutation}
      />

      <TogglePopupStatusModal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        popup={selectedPopup}
      />

      <DeletePopupModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        popup={selectedPopup}
      />
    </div>
  );
};

export default PopupPage;
