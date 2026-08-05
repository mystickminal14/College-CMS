import { useState } from "react";
import { ArrowUp, Edit, Stamp, Trash2 } from "lucide-react";
import { debounce } from "lodash";
import { FaPlus } from "react-icons/fa";

import { PAGE_LIMIT } from "../../constants";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "../users/utils/SearchBox";

import type { ClassTiming } from "./model/ClassTimingModel";
import { ClassTimingColumns } from "./columns";
import useGetAllClassTiming from "./hooks/useGetAllClassTiming";
import useCreateClassTiming from "./hooks/useCreateClassTiming";
import useEditClassTiming, {
  useChangeClassTimingStatus,
} from "./hooks/useEditClassTiming";
import useDeleteClassTiming from "./hooks/useDeleteClassTiming";
import AddEditClassTimingModal from "./components/AddEditClassTiming";
import ChangeClassTimingOrderModal from "./components/ChangeOrder";
import StatusModal from "./components/StatusModel";
import DeleteClassTimingModal from "./components/DeleteClassTiming";

const ClassTimingComp = () => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [statusFilter, setStatusFilter] = useState<"ENABLED" | "DISABLED" | "">("");

  const { data, isLoading, isError } = useGetAllClassTiming({
    search: debouncedSearch,
    page,
    status: statusFilter,
    limit,
  });

  const createMutation = useCreateClassTiming();
  const editMutation = useEditClassTiming();
  const statusMutation = useChangeClassTimingStatus();
  const deleteMutation = useDeleteClassTiming();

  const classTimings = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const [showModal, setShowModal] = useState(false);
  const [timingToEdit, setTimingToEdit] = useState<ClassTiming | null>(null);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [timingToChangeOrder, setTimingToChangeOrder] = useState<ClassTiming | null>(null);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusData, setStatusData] = useState<ClassTiming | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [timingToDelete, setTimingToDelete] = useState<ClassTiming | null>(null);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleAdd = (classTiming?: ClassTiming) => {
    setTimingToEdit(classTiming ?? null);
    setShowModal(true);
  };

  const handleEdit = (classTiming: ClassTiming) => {
    setTimingToEdit(classTiming);
    setShowModal(true);
  };

  const handleStatusChange = (row: ClassTiming) => {
    setStatusData(row);
    setShowStatusModal(true);
  };

  const handleDelete = (classTiming: ClassTiming) => {
    setTimingToDelete(classTiming);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!timingToDelete?.id) return;
    deleteMutation.mutate(timingToDelete.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setTimingToDelete(null);
      },
    });
  };

  const tableActions: {
    icon: React.ReactNode | ((row: ClassTiming) => React.ReactNode);
    tooltip: string | ((row: ClassTiming) => string);
    onClick: (row: ClassTiming) => void;
    color?: string | ((row: ClassTiming) => string);
    condition?: (row: ClassTiming) => boolean;
  }[] = [
    {
      icon: <Edit className="w-4 h-4" />,
      tooltip: "Edit Class Timing",
      onClick: handleEdit,
      color: "text-[#135EAB]",
    },
    {
      icon: <ArrowUp className="w-4 h-4" />,
      tooltip: "Change Order",
      onClick: (classTiming) => {
        setTimingToChangeOrder(classTiming);
        setShowOrderModal(true);
      },
      color: "text-purple-600",
    },
    {
      icon: <Stamp className="w-5 h-5" />,
      tooltip: (row) =>
        row.status === "ENABLED" ? "Disable Class Timing" : "Enable Class Timing",
      onClick: handleStatusChange,
      color: (row) =>
        row.status === "ENABLED"
          ? "text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white"
          : "text-red-600 border-red-200 hover:bg-red-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      tooltip: "Delete Class Timing",
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
          data={classTimings}
          columns={ClassTimingColumns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={
            isError ? "Failed to load Class Timings" : "No Class Timings found"
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

      <ChangeClassTimingOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        classTiming={timingToChangeOrder}
        maxOrder={total}
      />

      <AddEditClassTimingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        timing={timingToEdit ?? undefined}
        isEdit={!!timingToEdit}
        mutation={createMutation}
        editMutation={editMutation}
      />

      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        data={statusData}
        mutation={statusMutation}
      />

      <DeleteClassTimingModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        classTiming={timingToDelete}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default ClassTimingComp;
