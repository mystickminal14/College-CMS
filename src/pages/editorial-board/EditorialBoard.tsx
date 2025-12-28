import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { FaTable } from "react-icons/fa";
import { debounce } from "lodash";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "./utils/SearchBox";


import { PAGE_LIMIT } from "../../constants";
import type { EditorialMember, HonoraryPosition } from "./model/EditoralModel";
import useGetEditorial from "./hooks/useGetAll";
import useCreateEditorial from "./hooks/useCreate";
import useEditEditorial from "./hooks/useEdit";
import { EditorialColumns } from "./utils/columns";
import DeleteEditorialModal from "./components/DeleteModel";
import AddEditEditorialWizardModal from "./components/Wizard";

const positions: HonoraryPosition[] = [
  "CHIEF_PATRON",
  "PATRON",
  "EDITOR_IN_CHIEF",
  "ASSOCIATE_EDITOR",
  "MANAGING_EDITOR",
  "EDITORIAL_BOARD_MEMBER",
  "ADVISOR",
];

const EditorialPage = () => {
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<HonoraryPosition | "">("");
  const [memberToEdit, setMemberToEdit] = useState<EditorialMember | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useGetEditorial({
    search: debouncedSearch,
    honoraryPosition: selectedPosition,
    page,
    limit: PAGE_LIMIT
  });

  const createMutation = useCreateEditorial();
  const editMutation = useEditEditorial();


  const members = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handleAdd = () => { setMemberToEdit(null); setShowModal(true); };
  const handleEdit = (member: EditorialMember) => { setMemberToEdit(member); setShowModal(true); };
  const handleDelete = (member: EditorialMember) => { setMemberToEdit(member); setShowDeleteModal(true); };

  const tableActions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Member",
      onClick: handleEdit,
      color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white"
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Member",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white"
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-2 md:p-4">
      <TitleBox title="Editorial Board" subtitle="Manage editorial members" />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between my-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:items-center">
          <SearchBox placeholder="Search Members..." onSearch={handleSearch} />
          <select
            className="w-full sm:w-auto px-4 py-3 pr-10 text-gray-900 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 cursor-pointer appearance-none transition duration-150 ease-in-out"
            value={selectedPosition}
            onChange={(e) => { setSelectedPosition(e.target.value as HonoraryPosition | ""); setPage(1); }}
          >
            <option value="">All Positions</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
          >
            <FaTable className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <EnhancedTable
        data={members}
        columns={EditorialColumns}
        actions={tableActions}
        loading={isLoading}
        emptyMessage={isError ? "Failed to load Members" : "No Members found"}
      />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} hasNextPage={data?.pagination?.hasNextPage ?? false} onPageChange={setPage} />

      {/* Modals */}
      <DeleteEditorialModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        member={memberToEdit}
      />
      <AddEditEditorialWizardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        memberToEdit={memberToEdit}
        createMutation={createMutation}
        editMutation={editMutation}
    
      />
    </div>
  );
};

export default EditorialPage;
