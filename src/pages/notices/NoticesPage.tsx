import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { FaTable, FaThLarge } from "react-icons/fa";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";

import useGetNotices from "./hooks/useGetAll";
import useCreateNotices from "./hooks/useCreate";
import useEditNotices from "./hooks/useEdit";
import { useUpdatefile } from "./hooks/useUpdateImage";

import AddEditNoticesWizardModal from "./components/Wizard";
import DeleteNoticesModal from "./components/DeleteModel";
import { NoticeColumns } from "./utils/columns";

import type { Notices } from "./model/NoticeModel";
import { PAGE_LIMIT } from "../../constants";
import NoticeTypeComp from "../notice-type/NoticeTypeComp";
import useGetNoticeTypeNameAll from "../notice-type/hooks/useGetNoticeTypeName";
import { noticeTypeLabel, noticeTypeSolidClass } from "../notice-type/utils/badge";

const NoticesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [selectedTypeId, setSelectedTypeId] = useState<number | "">("");
  const [noticeToEdit, setNoticeToEdit] = useState<Notices | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "card" | "type">("table");

  const { data, isLoading, isError } = useGetNotices({
    typeId: selectedTypeId,
    page,
    limit,
  });

  const { data: noticeTypesData } = useGetNoticeTypeNameAll();
  const noticeTypes = noticeTypesData?.data ?? [];

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const createMutation = useCreateNotices();
  const editMutation = useEditNotices();
  const uploadPdfMutation = useUpdatefile(); // create
  const updatePdfMutation = useUpdatefile(); // edit

  const Notices = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const handleAdd = () => {
    setNoticeToEdit(null);
    setShowModal(true);
  };
  const handleEdit = (notice: Notices) => {
    setNoticeToEdit(notice);
    setShowModal(true);
  };
  const handleDelete = (notice: Notices) => {
    setNoticeToEdit(notice);
    setShowDeleteModal(true);
  };

  const tableActions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Notice",
      onClick: handleEdit,
      color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Notice",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Our Notices" subtitle="Manage your notices" />

      {/* Controls: View + Filter + Add */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 flex items-center space-x-1 rounded transition-colors ${
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
            className={`px-4 py-2 flex items-center space-x-1 rounded transition-colors ${
              viewMode === "card"
                ? "bg-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaThLarge className="w-4 h-4" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode("type")}
            className={`px-4 py-2 flex items-center space-x-1 rounded transition-colors ${
              viewMode === "type"
                ? "bg-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Notice Types</span>
          </button>
        </div>

        {viewMode !== "type" && (
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
          <select
            className="w-full md:w-auto px-4 py-3 pr-10 text-gray-900 text-sm bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition duration-150"
            value={selectedTypeId}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedTypeId(val ? Number(val) : "");
              setPage(1);
            }}
          >
            <option value="">All Types</option>
            {noticeTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Notice</span>
          </button>
        </div>
        )}
      </div>

      {/* Notice type management view */}
      {viewMode === "type" && <NoticeTypeComp />}

      {/* Content */}
      {viewMode !== "type" && (
      <div>
        {viewMode === "table" ? (
          <EnhancedTable
            data={Notices}
            columns={NoticeColumns}
            actions={tableActions}
            loading={isLoading}
            emptyMessage={isError ? "Failed to load Notices" : "No Notices found"}
            total={total}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Notices.map((notice) => (
              <div key={notice.id} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg">{notice.program_name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{notice.date}</p>
                </div>
                <span className={`mt-3 inline-block px-3 py-1 rounded-full text-white font-medium text-sm ${noticeTypeSolidClass(
                  notice.type
                )}`}>
                  {noticeTypeLabel(notice.type)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      )}

      {/* Pagination */}
      {viewMode !== "type" && (
        <Pagination
          page={page}
          hasNextPage={hasNextPage}
          totalPages={totalPages}
          onPageChange={setPage}
          limit={limit}
          onLimitChange={handleLimitChange}
          total={total}
        />
      )}

      {/* Modals */}
      <DeleteNoticesModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        Notices={noticeToEdit}
      />
      <AddEditNoticesWizardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        NoticesToEdit={noticeToEdit}
        createMutation={createMutation}
        editMutation={editMutation}
        uploadPdfMutation={uploadPdfMutation}
        updatePdfMutation={updatePdfMutation}
      />
    </div>
  );
};

export default NoticesPage;
