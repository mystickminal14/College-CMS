import { useState } from "react";
import { ArrowUp, Edit, Trash2 } from "lucide-react";
import { FaTable, FaThLarge, } from "react-icons/fa";
import { debounce } from "lodash";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "./utils/SearchBox";

import useGetTeams from "./hooks/useGetAll";
import useCreateTeams from "./hooks/useCreate";
import useEditTeams from "./hooks/useEdit";

import AddEditTeamsWizardModal from "./components/Wizard";
import DeleteTeamsModal from "./components/DeleteModel";
import TeamsCardView from "./components/TeamsCardView";

import { TeamsColumns } from "./utils/columns";
import type { Department, Teams } from "./model/TeamsModel";
import { PAGE_LIMIT } from "../../constants";
import { useUploadTeamsImage } from "./hooks/useUploadAlumni";
import ChangeTeamOrderModal from "./components/ChangeTeamOrder";

const TeamsPage = () => {
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | "">("");
  const [teamToEdit, setTeamToEdit] = useState<Teams | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useGetTeams({
    search: debouncedSearch,
    department: selectedDepartment,
    page,
    limit: PAGE_LIMIT
  });

  const createMutation = useCreateTeams();
  const editMutation = useEditTeams();
  const uploadImageMutation = useUploadTeamsImage();

  const teams = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const departments: Department[] = ["ADMINISTRATION", "COMPUTING", "MANAGEMENT"];

  const handleAdd = () => { setTeamToEdit(null); setShowModal(true); };
  const handleEdit = (team: Teams) => { setTeamToEdit(team); setShowModal(true); };
  const handleDeleteTeam = (team: Teams) => { setTeamToEdit(team); setShowDeleteModal(true); };
const [showOrderModal, setShowOrderModal] = useState(false);
const [teamToChangeOrder, setTeamToChangeOrder] = useState<Teams | null>(null);

  const tableActions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Team",
      onClick: handleEdit,
      color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white"
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Team",
      onClick: handleDeleteTeam,
      color: "text-red-600 hover:bg-red-600 hover:text-white"
    },  {
  icon: <ArrowUp className="w-4 h-4" />,
  tooltip: "Change Order",
  onClick: (team:Teams) => {
    setTeamToChangeOrder(team);
    setShowOrderModal(true);
  },
  color: "text-purple-600",
},
  ];
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Our Teams" subtitle="Manage your team members" />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${viewMode === "table"
              ? "bg-[#1a7cd3] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Table</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${viewMode === "card"
              ? "bg-[#1a7cd3] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <FaThLarge className="w-4 h-4" />
            <span>Cards</span>
          </button>
        </div>

        {/* Search + Department Filter + Add */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
          <SearchBox placeholder="Search Teams..." onSearch={handleSearch} />

          <select
            className="w-full md:w-auto px-4 py-3 pr-10 text-gray-900 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 cursor-pointer appearance-none transition duration-150 ease-in-out"
            value={selectedDepartment}
            onChange={(e) => { setSelectedDepartment(e.target.value as Department | ""); setPage(1); }}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept.charAt(0) + dept.slice(1).toLowerCase()}
              </option>
            ))}
          </select>

          <button
          onClick={handleAdd}
          className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Member</span>
        </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {viewMode === "table" ? (
          <EnhancedTable
            data={teams}
            columns={TeamsColumns}
            actions={tableActions}
            loading={isLoading}
            emptyMessage={isError ? "Failed to load Teams" : "No Teams found"}
          />
        ) : (
          <TeamsCardView
            teams={teams}
            isLoading={isLoading}
            isError={isError}
            onEdit={handleEdit}
            onDelete={handleDeleteTeam}
          />
        )}
      </div>

      {/* Pagination */}
      <Pagination page={page} hasNextPage={hasNextPage} totalPages={totalPages} onPageChange={setPage} />

      {/* Modals */}
      <DeleteTeamsModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        Teams={teamToEdit}
      />
      <AddEditTeamsWizardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        TeamsToEdit={teamToEdit}
        createMutation={createMutation}
        editMutation={editMutation}
        uploadImageMutation={uploadImageMutation}
      />      
    <ChangeTeamOrderModal
  isOpen={showOrderModal}
  onClose={() => setShowOrderModal(false)}
  team={teamToChangeOrder}
  maxOrder={teams.length}
/>

    </div>
  );
};

export default TeamsPage;
