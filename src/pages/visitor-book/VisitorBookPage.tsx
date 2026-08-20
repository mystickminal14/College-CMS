import { useState } from "react";
import { debounce } from "lodash";
import { FaPlus, FaTable } from "react-icons/fa";
import { LogOut, QrCode, Trash2, Users, UserCheck, UserX } from "lucide-react";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "../users/utils/SearchBox";
import { PAGE_LIMIT } from "../../constants";

import type { Visitor } from "./model/VisitorModel";
import { VisitorColumns } from "./columns";
import useGetVisitors from "./hooks/useGetVisitors";
import useGetVisitorsToday from "./hooks/useGetVisitorsToday";
import useCheckOutVisitor from "./hooks/useCheckOutVisitor";
import useDeleteVisitor from "./hooks/useDeleteVisitor";
import AddVisitorModal from "./components/AddVisitorModal";
import VisitorPassModal from "./components/VisitorPassModal";
import CheckOutVisitorModal from "./components/CheckOutVisitorModal";
import DeleteVisitorModal from "./components/DeleteVisitorModal";
import VisitPurposeComp from "../visit-purpose/VisitPurposeComp";

type ViewMode = "today" | "all" | "purposes";

const VisitorBookPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("today");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: todayData, isLoading: todayLoading, isError: todayError } = useGetVisitorsToday();
  const { data: allData, isLoading: allLoading, isError: allError } = useGetVisitors({
    search: debouncedSearch,
    page,
    limit,
  });

  const checkOutMutation = useCheckOutVisitor();
  const deleteMutation = useDeleteVisitor();

  const [showAddModal, setShowAddModal] = useState(false);
  const [passVisitor, setPassVisitor] = useState<Visitor | null>(null);

  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [visitorToCheckOut, setVisitorToCheckOut] = useState<Visitor | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [visitorToDelete, setVisitorToDelete] = useState<Visitor | null>(null);

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const confirmCheckOut = () => {
    if (!visitorToCheckOut?.id) return;
    checkOutMutation.mutate(visitorToCheckOut.id, {
      onSuccess: () => {
        setShowCheckOutModal(false);
        setVisitorToCheckOut(null);
      },
    });
  };

  const confirmDelete = () => {
    if (!visitorToDelete?.id) return;
    deleteMutation.mutate(visitorToDelete.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setVisitorToDelete(null);
      },
    });
  };

  const tableActions: {
    icon: React.ReactNode | ((row: Visitor) => React.ReactNode);
    tooltip: string | ((row: Visitor) => string);
    onClick: (row: Visitor) => void;
    color?: string;
    condition?: (row: Visitor) => boolean;
  }[] = [
    {
      icon: <LogOut className="w-4 h-4" />,
      tooltip: "Check Out",
      onClick: (row) => {
        setVisitorToCheckOut(row);
        setShowCheckOutModal(true);
      },
      color: "text-[#1a7cd3]",
      condition: (row) => row.status === "IN",
    },
    {
      icon: <QrCode className="w-4 h-4" />,
      tooltip: "View Pass",
      onClick: (row) => setPassVisitor(row),
      color: "text-purple-600",
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      tooltip: "Delete Visitor",
      onClick: (row) => {
        setVisitorToDelete(row);
        setShowDeleteModal(true);
      },
      color: "text-red-600",
    },
  ];

  const todayVisitors = todayData?.data?.visitors ?? [];
  const allVisitors = allData?.data ?? [];
  const totalPages = allData?.pagination?.totalPages ?? 1;
  const hasNextPage = allData?.pagination?.hasNextPage ?? false;
  const totalAll = allData?.pagination?.total ?? 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Visitor Book" subtitle="Front office visitor check-in and check-out" />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setViewMode("today")}
            className={`px-4 py-2 flex items-center space-x-1 rounded transition-colors ${
              viewMode === "today"
                ? "bg-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Today</span>
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`px-4 py-2 flex items-center space-x-1 rounded transition-colors ${
              viewMode === "all"
                ? "bg-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTable className="w-4 h-4" />
            <span>All Visitors</span>
          </button>
          <button
            onClick={() => setViewMode("purposes")}
            className={`px-4 py-2 flex items-center space-x-1 rounded transition-colors ${
              viewMode === "purposes"
                ? "bg-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Purposes</span>
          </button>
        </div>

        {viewMode !== "purposes" && (
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
            {viewMode === "all" && <SearchBox placeholder="Search name / phone..." onSearch={handleSearch} />}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Visitor</span>
            </button>
          </div>
        )}
      </div>

      {viewMode === "today" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayData?.data?.total ?? 0}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Currently Inside</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayData?.data?.checkedIn ?? 0}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex items-center gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <UserX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Checked Out</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayData?.data?.checkedOut ?? 0}</p>
              </div>
            </div>
          </div>

          <EnhancedTable
            data={todayVisitors}
            columns={VisitorColumns}
            actions={tableActions}
            loading={todayLoading}
            emptyMessage={todayError ? "Failed to load today's visitors" : "No visitors yet today"}
          />
        </>
      )}

      {viewMode === "all" && (
        <>
          <EnhancedTable
            data={allVisitors}
            columns={VisitorColumns}
            actions={tableActions}
            loading={allLoading}
            emptyMessage={allError ? "Failed to load visitors" : "No visitors found"}
            total={totalAll}
          />
          <Pagination
            page={page}
            hasNextPage={hasNextPage}
            totalPages={totalPages}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={handleLimitChange}
            total={totalAll}
          />
        </>
      )}

      {viewMode === "purposes" && <VisitPurposeComp />}

      <AddVisitorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreated={(visitor) => setPassVisitor(visitor)}
        onManagePurposes={() => {
          setShowAddModal(false);
          setViewMode("purposes");
        }}
      />

      <VisitorPassModal visitor={passVisitor} onClose={() => setPassVisitor(null)} />

      <CheckOutVisitorModal
        isOpen={showCheckOutModal}
        onClose={() => setShowCheckOutModal(false)}
        visitor={visitorToCheckOut}
        onConfirm={confirmCheckOut}
        loading={checkOutMutation.isPending}
      />

      <DeleteVisitorModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        visitor={visitorToDelete}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default VisitorBookPage;
