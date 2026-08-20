import { useState } from "react";
import { ArrowUp, Edit, Stamp, Trash2 } from "lucide-react";
import { debounce } from "lodash";
import { FaPlus } from "react-icons/fa";

import { PAGE_LIMIT } from "../../constants";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "../users/utils/SearchBox";

import type { VisitPurpose } from "./model/VisitPurposeModel";
import { VisitPurposeColumns } from "./columns";
import useGetAllVisitPurpose from "./hooks/useGetAllVisitPurpose";
import useCreateVisitPurpose from "./hooks/useCreateVisitPurpose";
import useEditVisitPurpose, {
  useChangeVisitPurposeStatus,
} from "./hooks/useEditVisitPurpose";
import useDeleteVisitPurpose from "./hooks/useDeleteVisitPurpose";
import AddEditVisitPurposeModal from "./components/AddEditVisitPurpose";
import ChangeVisitPurposeOrderModal from "./components/ChangeOrder";
import StatusModal from "./components/StatusModel";
import DeleteVisitPurposeModal from "./components/DeleteVisitPurpose";

const VisitPurposeComp = () => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [statusFilter, setStatusFilter] = useState<"ENABLED" | "DISABLED" | "">("");

  const { data, isLoading, isError } = useGetAllVisitPurpose({
    search: debouncedSearch,
    page,
    status: statusFilter,
    limit,
  });

  const createMutation = useCreateVisitPurpose();
  const editMutation = useEditVisitPurpose();
  const statusMutation = useChangeVisitPurposeStatus();
  const deleteMutation = useDeleteVisitPurpose();

  const purposes = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const [showModal, setShowModal] = useState(false);
  const [purposeToEdit, setPurposeToEdit] = useState<VisitPurpose | null>(null);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [purposeToChangeOrder, setPurposeToChangeOrder] = useState<VisitPurpose | null>(null);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusData, setStatusData] = useState<VisitPurpose | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [purposeToDelete, setPurposeToDelete] = useState<VisitPurpose | null>(null);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleAdd = (purpose?: VisitPurpose) => {
    setPurposeToEdit(purpose ?? null);
    setShowModal(true);
  };

  const handleEdit = (purpose: VisitPurpose) => {
    setPurposeToEdit(purpose);
    setShowModal(true);
  };

  const handleStatusChange = (row: VisitPurpose) => {
    setStatusData(row);
    setShowStatusModal(true);
  };

  const handleDelete = (purpose: VisitPurpose) => {
    setPurposeToDelete(purpose);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!purposeToDelete?.id) return;
    deleteMutation.mutate(purposeToDelete.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setPurposeToDelete(null);
      },
    });
  };

  const tableActions: {
    icon: React.ReactNode | ((row: VisitPurpose) => React.ReactNode);
    tooltip: string | ((row: VisitPurpose) => string);
    onClick: (row: VisitPurpose) => void;
    color?: string | ((row: VisitPurpose) => string);
    condition?: (row: VisitPurpose) => boolean;
  }[] = [
    {
      icon: <Edit className="w-4 h-4" />,
      tooltip: "Edit Purpose",
      onClick: handleEdit,
      color: "text-[#135EAB]",
      condition: (row) => !row.isOther,
    },
    {
      icon: <ArrowUp className="w-4 h-4" />,
      tooltip: "Change Order",
      onClick: (purpose) => {
        setPurposeToChangeOrder(purpose);
        setShowOrderModal(true);
      },
      color: "text-purple-600",
      condition: (row) => !row.isOther,
    },
    {
      icon: <Stamp className="w-5 h-5" />,
      tooltip: (row) =>
        row.status === "ENABLED" ? "Disable Purpose" : "Enable Purpose",
      onClick: handleStatusChange,
      color: (row) =>
        row.status === "ENABLED"
          ? "text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white"
          : "text-red-600 border-red-200 hover:bg-red-600 hover:text-white",
      condition: (row) => !row.isOther,
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      tooltip: "Delete Purpose",
      onClick: handleDelete,
      color: "text-red-600",
      condition: (row) => !row.isOther,
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
          data={purposes}
          columns={VisitPurposeColumns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={
            isError ? "Failed to load Purposes" : "No Purposes found"
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

      <ChangeVisitPurposeOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        purpose={purposeToChangeOrder}
        maxOrder={total}
      />

      <AddEditVisitPurposeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={purposeToEdit ?? undefined}
        isEdit={!!purposeToEdit}
        mutation={createMutation}
        editMutation={editMutation}
      />

      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        data={statusData}
        mutation={statusMutation}
      />

      <DeleteVisitPurposeModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        purpose={purposeToDelete}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default VisitPurposeComp;
