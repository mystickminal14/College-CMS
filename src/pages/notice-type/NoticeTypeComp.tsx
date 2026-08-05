import { useState } from "react";
import { ArrowUp, Edit, Stamp, Trash2 } from "lucide-react";
import { debounce } from "lodash";
import { FaPlus } from "react-icons/fa";

import { PAGE_LIMIT } from "../../constants";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "../users/utils/SearchBox";

import type { NoticeType } from "./model/NoticeTypeModel";
import { NoticeTypeColumns } from "./columns";
import useGetAllNoticeType from "./hooks/useGetAllNoticeType";
import useCreateNoticeType from "./hooks/useCreateNoticeType";
import useEditNoticeType, {
  useChangeNoticeTypeStatus,
} from "./hooks/useEditNoticeType";
import useDeleteNoticeType from "./hooks/useDeleteNoticeType";
import AddEditNoticeTypeModal from "./components/AddEditNoticeType";
import ChangeNoticeTypeOrderModal from "./components/ChangeOrder";
import StatusModal from "./components/StatusModel";
import DeleteNoticeTypeModal from "./components/DeleteNoticeType";

const NoticeTypeComp = () => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [statusFilter, setStatusFilter] = useState<"ENABLED" | "DISABLED" | "">("");

  const { data, isLoading, isError } = useGetAllNoticeType({
    search: debouncedSearch,
    page,
    status: statusFilter,
    limit,
  });

  const createMutation = useCreateNoticeType();
  const editMutation = useEditNoticeType();
  const statusMutation = useChangeNoticeTypeStatus();
  const deleteMutation = useDeleteNoticeType();

  const noticeTypes = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const [showModal, setShowModal] = useState(false);
  const [typeToEdit, setTypeToEdit] = useState<NoticeType | null>(null);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [typeToChangeOrder, setTypeToChangeOrder] = useState<NoticeType | null>(null);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusData, setStatusData] = useState<NoticeType | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<NoticeType | null>(null);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleAdd = (noticeType?: NoticeType) => {
    setTypeToEdit(noticeType ?? null);
    setShowModal(true);
  };

  const handleEdit = (noticeType: NoticeType) => {
    setTypeToEdit(noticeType);
    setShowModal(true);
  };

  const handleStatusChange = (row: NoticeType) => {
    setStatusData(row);
    setShowStatusModal(true);
  };

  const handleDelete = (noticeType: NoticeType) => {
    setTypeToDelete(noticeType);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!typeToDelete?.id) return;
    deleteMutation.mutate(typeToDelete.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setTypeToDelete(null);
      },
    });
  };

  const tableActions: {
    icon: React.ReactNode | ((row: NoticeType) => React.ReactNode);
    tooltip: string | ((row: NoticeType) => string);
    onClick: (row: NoticeType) => void;
    color?: string | ((row: NoticeType) => string);
    condition?: (row: NoticeType) => boolean;
  }[] = [
    {
      icon: <Edit className="w-4 h-4" />,
      tooltip: "Edit Notice Type",
      onClick: handleEdit,
      color: "text-[#135EAB]",
    },
    {
      icon: <ArrowUp className="w-4 h-4" />,
      tooltip: "Change Order",
      onClick: (noticeType) => {
        setTypeToChangeOrder(noticeType);
        setShowOrderModal(true);
      },
      color: "text-purple-600",
    },
    {
      icon: <Stamp className="w-5 h-5" />,
      tooltip: (row) =>
        row.status === "ENABLED" ? "Disable Notice Type" : "Enable Notice Type",
      onClick: handleStatusChange,
      color: (row) =>
        row.status === "ENABLED"
          ? "text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white"
          : "text-red-600 border-red-200 hover:bg-red-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      tooltip: "Delete Notice Type",
      onClick: handleDelete,
      color: "text-red-600",
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
        <SearchBox placeholder="Search ..." onSearch={handleSearch} />

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "ENABLED" | "DISABLED" | "");
              setPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
          >
            <option value="">All</option>
            <option value="ENABLED">Enabled</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </div>

        <button
          onClick={() => handleAdd()}
          disabled={createMutation.isPending}
          className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
        >
          <FaPlus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      <div className="mt-1">
        <EnhancedTable
          data={noticeTypes}
          columns={NoticeTypeColumns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={
            isError ? "Failed to load Notice Types" : "No Notice Types found"
          }
          total={total}
        />
      </div>

      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={handleLimitChange}
        total={total}
      />

      <ChangeNoticeTypeOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        noticeType={typeToChangeOrder}
        maxOrder={total}
      />

      <AddEditNoticeTypeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={typeToEdit ?? undefined}
        isEdit={!!typeToEdit}
        mutation={createMutation}
        editMutation={editMutation}
      />

      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        data={statusData}
        mutation={statusMutation}
      />

      <DeleteNoticeTypeModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        noticeType={typeToDelete}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default NoticeTypeComp;
