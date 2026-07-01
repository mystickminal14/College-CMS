import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { FaTable, FaThLarge } from "react-icons/fa";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";

import useGetAllCourseRegistrations from "./hooks/useGetAll";
import ViewRegistrationModal from "./components/ViewModal";
import DeleteRegistrationModal from "./components/DeleteModal";
import { CourseRegistrationColumns } from "./utils/columns";

import type { CourseRegistration } from "./model/CourseRegistrationModel";
import { PAGE_LIMIT } from "../../constants";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const CourseRegistrationPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const [regToView, setRegToView] = useState<CourseRegistration | null>(null);
  const [regToDelete, setRegToDelete] = useState<CourseRegistration | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useGetAllCourseRegistrations({
    page,
    limit,
    search,
    date,
  });

  const registrations = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleView = (r: CourseRegistration) => {
    setRegToView(r);
    setShowViewModal(true);
  };

  const handleDelete = (r: CourseRegistration) => {
    setRegToDelete(r);
    setShowDeleteModal(true);
  };

  const tableActions = [
    {
      icon: <Eye className="w-4 h-4" />,
      tooltip: "View Details",
      onClick: handleView,
      color: "text-indigo-600 hover:bg-indigo-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      tooltip: "Delete",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox
        title="Course Registrations"
        subtitle="View and manage course interest registrations from students"
      />

      {/* Controls */}
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
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name, email or course..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full sm:w-64 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setPage(1); }}
            title="Filter by registration date"
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          {date && (
            <button
              onClick={() => { setDate(""); setPage(1); }}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <EnhancedTable
          data={registrations}
          columns={CourseRegistrationColumns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={isError ? "Failed to load registrations" : "No registrations found"}
          total={total}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {registrations.map((r) => (
            <div key={r.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col gap-2">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{r.fullName}</h3>
                <p className="text-sm text-blue-600 font-medium">{r.courseName}</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                <p>{r.email}</p>
                <p>{r.phone}</p>
                <p>Registered: {formatDate(r.createdAt)}</p>
              </div>
              {r.message && (
                <p className="text-xs text-gray-400 italic line-clamp-2">{r.message}</p>
              )}
              <div className="flex gap-2 mt-auto pt-2">
                <button
                  onClick={() => handleView(r)}
                  className="flex-1 text-xs py-1.5 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-500 hover:text-white transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(r)}
                  className="flex-1 text-xs py-1.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={handleLimitChange}
        total={total}
      />

      <ViewRegistrationModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        registration={regToView}
      />
      <DeleteRegistrationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        registration={regToDelete}
      />
    </div>
  );
};

export default CourseRegistrationPage;
