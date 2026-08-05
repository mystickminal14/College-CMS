import { useState } from "react";
import { ArrowUp, Edit, Stamp, Trash2 } from "lucide-react";
import { debounce } from "lodash";
import { FaPlus } from "react-icons/fa";

import { PAGE_LIMIT } from "../../constants";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "../users/utils/SearchBox";

import type { Shift } from "./model/ShiftModel";
import { ShiftColumns } from "./columns";
import useGetAllShift from "./hooks/useGetAllShift";
import useCreateShift from "./hooks/useCreateShift";
import useEditShift, { useChangeShiftStatus } from "./hooks/useEditShift";
import useDeleteShift from "./hooks/useDeleteShift";
import AddEditShiftModal from "./components/AddEditShift";
import ChangeShiftOrderModal from "./components/ChangeOrder";
import StatusModal from "./components/StatusModel";
import DeleteShiftModal from "./components/DeleteShift";

const ShiftComp = () => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [statusFilter, setStatusFilter] = useState<"ENABLED" | "DISABLED" | "">("");

  const { data, isLoading, isError } = useGetAllShift({
    search: debouncedSearch,
    page,
    status: statusFilter,
    limit,
  });

  const createMutation = useCreateShift();
  const editMutation = useEditShift();
  const statusMutation = useChangeShiftStatus();
  const deleteMutation = useDeleteShift();

  const shifts = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const [showModal, setShowModal] = useState(false);
  const [shiftToEdit, setShiftToEdit] = useState<Shift | null>(null);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [shiftToChangeOrder, setShiftToChangeOrder] = useState<Shift | null>(null);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusData, setStatusData] = useState<Shift | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shiftToDelete, setShiftToDelete] = useState<Shift | null>(null);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleAdd = (shift?: Shift) => {
    setShiftToEdit(shift ?? null);
    setShowModal(true);
  };

  const handleEdit = (shift: Shift) => {
    setShiftToEdit(shift);
    setShowModal(true);
  };

  const handleStatusChange = (row: Shift) => {
    setStatusData(row);
    setShowStatusModal(true);
  };

  const handleDelete = (shift: Shift) => {
    setShiftToDelete(shift);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!shiftToDelete?.id) return;
    deleteMutation.mutate(shiftToDelete.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setShiftToDelete(null);
      },
    });
  };

  const tableActions: {
    icon: React.ReactNode | ((row: Shift) => React.ReactNode);
    tooltip: string | ((row: Shift) => string);
    onClick: (row: Shift) => void;
    color?: string | ((row: Shift) => string);
    condition?: (row: Shift) => boolean;
  }[] = [
    {
      icon: <Edit className="w-4 h-4" />,
      tooltip: "Edit Shift",
      onClick: handleEdit,
      color: "text-[#135EAB]",
    },
    {
      icon: <ArrowUp className="w-4 h-4" />,
      tooltip: "Change Order",
      onClick: (shift) => {
        setShiftToChangeOrder(shift);
        setShowOrderModal(true);
      },
      color: "text-purple-600",
    },
    {
      icon: <Stamp className="w-5 h-5" />,
      tooltip: (row) => (row.status === "ENABLED" ? "Disable Shift" : "Enable Shift"),
      onClick: handleStatusChange,
      color: (row) =>
        row.status === "ENABLED"
          ? "text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white"
          : "text-red-600 border-red-200 hover:bg-red-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      tooltip: "Delete Shift",
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
          data={shifts}
          columns={ShiftColumns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={isError ? "Failed to load Shifts" : "No Shifts found"}
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

      <ChangeShiftOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        shift={shiftToChangeOrder}
        maxOrder={total}
      />

      <AddEditShiftModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={shiftToEdit ?? undefined}
        isEdit={!!shiftToEdit}
        mutation={createMutation}
        editMutation={editMutation}
      />

      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        data={statusData}
        mutation={statusMutation}
      />

      <DeleteShiftModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        shift={shiftToDelete}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default ShiftComp;
