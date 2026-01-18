import { useState } from "react";

import { Eye, Power } from "lucide-react";
import { debounce } from "lodash";
import type { AlumniFormData, EStatusType } from "../models/alumniModel";
import useGetAlumni from "../hooks/useGet";
import TitleBox from "../../../../components/layout/TitleBox";
import EnhancedTable from "../../../../template/EnhancedTable";
import SearchBox from "../utils/SearchBox";
import { alumniColumns } from "../utils/columns";
import Pagination from "../../../../utils/Pagination";
import ViewAlumniModal from "./ViewAlumniModel";
import ToggleAlumniStatusModal from "./Toggleform";


const PAGE_LIMIT = 10;

const AlumniFormTable = () => {
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<EStatusType | "">("");
  const [selectedAlumni, setSelectedAlumni] =
    useState<AlumniFormData | null>(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);

  const { data, isLoading, isError } = useGetAlumni({
    search: debouncedSearch,
    page,
    limit: PAGE_LIMIT,
    status: selectedStatus,
  });

  const alumniList = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleView = (alumni: AlumniFormData) => {
    setSelectedAlumni(alumni);
    setShowViewModal(true);
  };

  const handleToggleStatus = (alumni: AlumniFormData) => {
    setSelectedAlumni(alumni);
    setShowToggleModal(true);
  };

  const tableActions = [
    {
      icon: <Eye className="w-5 h-5" />,
      tooltip: "View Alumni",
      onClick: handleView,
      color: "text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <Power className="w-5 h-5" />,
      tooltip: "Enable / Disable",
      onClick: handleToggleStatus,
      color: "text-yellow-600 hover:bg-yellow-600 hover:text-white",
    },
  ];

  const statusOptions: EStatusType[] = ["ENABLED", "DISABLED"];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox
        title="Alumni Form Submissions"
        subtitle="View and manage alumni form submissions"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
        <SearchBox
          placeholder="Search alumni..."
          onSearch={handleSearch}
        />

        <select
          className="w-full md:w-auto px-4 py-3 pr-10 text-gray-900 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 cursor-pointer appearance-none transition duration-150 ease-in-out"
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value as EStatusType | "");
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <EnhancedTable
        data={alumniList}
        columns={alumniColumns}
        actions={tableActions}
        loading={isLoading}
        emptyMessage={
          isError ? "Failed to load alumni data" : "No alumni found"
        }
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasNextPage={hasNextPage}
      />

      {/* VIEW MODAL */}
      <ViewAlumniModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        alumni={selectedAlumni}
      />

      {/* TOGGLE STATUS MODAL */}
      <ToggleAlumniStatusModal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        alumni={selectedAlumni}
      />
    </div>
  );
};

export default AlumniFormTable;
