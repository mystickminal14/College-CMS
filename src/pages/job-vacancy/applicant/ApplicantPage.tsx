import { useState } from "react";
import { Trash2, CheckCircle, ArrowLeft, Eye } from "lucide-react";
import { FaTable, FaThLarge } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import TitleBox from "../../../components/layout/TitleBox";
import EnhancedTable from "../../../template/EnhancedTable";
import Pagination from "../../../utils/Pagination";

import useGetApplicants from "./hooks/useGetAll";
import DeleteApplicantModal from "./components/DeleteModal";
import UpdateStatusModal from "./components/UpdateStatusModal";
import ViewApplicantModal from "./components/ViewApplicantModal";
import { ApplicantColumns } from "./utils/columns";

import type { ApplicationStatus, JobApplication } from "./model/ApplicantModel";
import { IMAGE_URL, PAGE_LIMIT } from "../../../constants";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  REVIEWED: "bg-blue-100 text-blue-800",
  SHORTLISTED: "bg-purple-100 text-purple-800",
  REJECTED: "bg-red-100 text-red-800",
  HIRED: "bg-green-100 text-green-800",
};

const ApplicantPage = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const [applicantToDelete, setApplicantToDelete] = useState<JobApplication | null>(null);
  const [applicantForStatus, setApplicantForStatus] = useState<JobApplication | null>(null);
  const [applicantToView, setApplicantToView] = useState<JobApplication | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const { data, isLoading, isError } = useGetApplicants({
    vacancyId: vacancyId ?? "",
    page,
    limit: PAGE_LIMIT,
    search,
  });

  const applicants = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  const handleDelete = (a: JobApplication) => {
    setApplicantToDelete(a);
    setShowDeleteModal(true);
  };
  const handleStatus = (a: JobApplication) => {
    setApplicantForStatus(a);
    setShowStatusModal(true);
  };
  const handleView = (a: JobApplication) => {
    setApplicantToView(a);
    setShowViewModal(true);
  };

  const tableActions = [
    {
      icon: <Eye className="w-4 h-4" />,
      tooltip: "View Applicant",
      onClick: handleView,
      color: "text-indigo-600 hover:bg-indigo-600 hover:text-white",
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      tooltip: "Update Status",
      onClick: handleStatus,
      color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white",
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      tooltip: "Delete Application",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  const vacancyName = applicants[0]?.vacancy?.designation ?? "";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox
        title={vacancyName ? `Applications — ${vacancyName}` : "Job Applications"}
        subtitle="Review and manage applicants for this vacancy"
      />

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/app/job-vacancy/vacancy")}
            className="px-4 py-2 flex items-center space-x-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Vacancies</span>
          </button>
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

        <div className="flex w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full md:w-56 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <EnhancedTable
          data={applicants}
          columns={ApplicantColumns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={isError ? "Failed to load applications" : "No applications found"}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applicants.map((a) => (
            <div key={a.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{a.fullName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{a.contactNumber}</p>
                </div>
                {a.applicationStatus && (
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[a.applicationStatus as ApplicationStatus]}`}>
                    {a.applicationStatus}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">
                Applied: {new Date(a.appliedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                <p>Gender: {a.gender.charAt(0) + a.gender.slice(1).toLowerCase()}</p>
                <p>Qualification: {a.highestQualification}</p>
              </div>
              {a.resumeUrl && (
                <button
                  onClick={() => window.open(IMAGE_URL + a.resumeUrl, "_blank")}
                  className="text-xs py-1.5 border border-blue-400 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
                >
                  View Resume
                </button>
              )}
              <div className="flex gap-2 mt-auto pt-2">
                <button onClick={() => handleView(a)} className="flex-1 text-xs py-1.5 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-500 hover:text-white transition">View</button>
                <button onClick={() => handleStatus(a)} className="flex-1 text-xs py-1.5 border border-[#1a7cd3] text-[#1a7cd3] rounded-lg hover:bg-[#1a7cd3] hover:text-white transition">Status</button>
                <button onClick={() => handleDelete(a)} className="flex-1 text-xs py-1.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} hasNextPage={hasNextPage} totalPages={totalPages} onPageChange={setPage} />

      <DeleteApplicantModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        applicant={applicantToDelete}
      />
      <UpdateStatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        applicant={applicantForStatus}
      />
      <ViewApplicantModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        applicant={applicantToView}
      />
    </div>
  );
};

export default ApplicantPage;
