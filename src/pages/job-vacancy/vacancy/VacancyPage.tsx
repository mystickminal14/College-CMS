import { useState } from "react";
import { Edit, Trash2, Image, ToggleLeft, ToggleRight, Users } from "lucide-react";
import { FaTable, FaThLarge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import TitleBox from "../../../components/layout/TitleBox";
import EnhancedTable from "../../../template/EnhancedTable";
import Pagination from "../../../utils/Pagination";

import useGetVacancies from "./hooks/useGetAll";
import useCreateVacancy from "./hooks/useCreate";
import useEditVacancy from "./hooks/useEdit";
import useToggleVacancyStatus from "./hooks/useToggleStatus";

import VacancyFormModal from "./components/VacancyFormModal";
import DeleteVacancyModal from "./components/DeleteModal";
import ImageUploadModal from "./components/ImageUploadModal";
import { VacancyColumns } from "./utils/columns";

import type { JobStatus, JobVacancy } from "./model/VacancyModel";
import { IMAGE_URL, PAGE_LIMIT } from "../../../constants";

const VacancyPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<JobStatus | "">("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const [vacancyToEdit, setVacancyToEdit] = useState<JobVacancy | null>(null);
  const [vacancyToDelete, setVacancyToDelete] = useState<JobVacancy | null>(null);
  const [vacancyForImage, setVacancyForImage] = useState<JobVacancy | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const { data, isLoading, isError } = useGetVacancies({
    page,
    limit,
    search,
    status: filterStatus,
  });

  const createMutation = useCreateVacancy();
  const editMutation = useEditVacancy();
  const toggleMutation = useToggleVacancyStatus();

  const vacancies = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleAdd = () => {
    setVacancyToEdit(null);
    setShowFormModal(true);
  };
  const handleEdit = (v: JobVacancy) => {
    setVacancyToEdit(v);
    setShowFormModal(true);
  };
  const handleDelete = (v: JobVacancy) => {
    setVacancyToDelete(v);
    setShowDeleteModal(true);
  };
  const handleImage = (v: JobVacancy) => {
    setVacancyForImage(v);
    setShowImageModal(true);
  };
  const handleToggle = (v: JobVacancy) => {
    toggleMutation.mutate({ id: v.id });
  };
  const handleOpenApplications = (v: JobVacancy) => {
    navigate(`/app/job-vacancy/applicant/${v.id}`);
  };

  const tableActions = [
    {
      icon: <Users className="w-4 h-4" />,
      tooltip: (row: JobVacancy) => `View Applications (${row._count?.applications ?? 0})`,
      onClick: handleOpenApplications,
      color: "text-green-600 hover:bg-green-600 hover:text-white",
    },
    {
      icon: <Edit className="w-4 h-4" />,
      tooltip: "Edit Vacancy",
      onClick: handleEdit,
      color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white",
    },
    {
      icon: (row: JobVacancy) =>
        row.status === "OPEN" ? (
          <ToggleRight className="w-4 h-4 text-green-600" />
        ) : (
          <ToggleLeft className="w-4 h-4 text-gray-400" />
        ),
      tooltip: (row: JobVacancy) =>
        row.status === "OPEN" ? "Close Vacancy" : "Open Vacancy",
      onClick: handleToggle,
      color: "hover:bg-gray-100 dark:hover:bg-gray-700",
    },
    {
      icon: <Image className="w-4 h-4" />,
      tooltip: "Update Poster",
      onClick: handleImage,
      color: "text-purple-600 hover:bg-purple-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      tooltip: "Delete Vacancy",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Job Vacancies" subtitle="Manage job openings" />

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

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
          <input
            type="text"
            placeholder="Search designation..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full md:w-48 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value as JobStatus | ""); setPage(1); }}
            className="w-full md:w-auto px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Vacancy</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <EnhancedTable
          data={vacancies}
          columns={VacancyColumns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={isError ? "Failed to load vacancies" : "No vacancies found"}
          total={total}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vacancies.map((v) => (
            <div key={v.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col gap-2">
              {v.posterUrl && (
                <img
                  src={IMAGE_URL + v.posterUrl}
                  alt="poster"
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <h3 className="font-bold text-gray-900 dark:text-white">{v.designation}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{v.location} · {v.timings}</p>
              {v.employmentType && <p className="text-xs text-gray-400">{v.employmentType}</p>}
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  v.status === "OPEN" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {v.status}
                </span>
                <button
                  onClick={() => handleOpenApplications(v)}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  {v._count?.applications ?? 0} applicants →
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(v)} className="flex-1 text-xs py-1.5 border border-[#1a7cd3] text-[#1a7cd3] rounded-lg hover:bg-[#1a7cd3] hover:text-white transition">Edit</button>
                <button onClick={() => handleToggle(v)} className="flex-1 text-xs py-1.5 border border-gray-300 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">Toggle</button>
                <button onClick={() => handleDelete(v)} className="flex-1 text-xs py-1.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">Delete</button>
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

      <VacancyFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        vacancyToEdit={vacancyToEdit}
        createMutation={createMutation}
        editMutation={editMutation}
      />
      <DeleteVacancyModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        vacancy={vacancyToDelete}
      />
      <ImageUploadModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        vacancy={vacancyForImage}
      />
    </div>
  );
};

export default VacancyPage;
