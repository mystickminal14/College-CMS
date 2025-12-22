import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { FaPlus } from "react-icons/fa";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import { PAGE_LIMIT } from "../../constants";
import type { Documents, EDegree } from "./model/DocsModel";
import useGetAll from "./hooks/useGetDocs";
import useCreateDocument from "./hooks/useAddDocs";
import useEditDocuments from "./hooks/useEditDocs";
import { DocumentsColumns } from "./utils/columns";
import DocumentForm from "./components/Wizard";
import DeleteDocumentsModal from "./components/DeleteModel";

const DocumentPage = () => {
  const [page, setPage] = useState(1);
  const [degreeFilter, setDegreeFilter] = useState<EDegree | "All">("All");
  const [documentToEdit, setDocumentToEdit] = useState<Documents | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);



  const { data, isLoading, isError } = useGetAll({
    search: degreeFilter === "All" ? undefined : degreeFilter,
    page,
    limit: PAGE_LIMIT,
  });

  const createMutation = useCreateDocument();
  const editMutation = useEditDocuments();

  const documents = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  const handleAdd = () => {
    setDocumentToEdit(null);
    setShowModal(true);
  };
  const handleEdit = (document: Documents) => {
    setDocumentToEdit(document);
    setShowModal(true);
  };
  const handleDelete = (document: Documents) => {
    setDocumentToEdit(document);
    setShowDeleteModal(true);
  };

  const tableActions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Document",
      onClick: handleEdit,
      color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Document",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Document Management" subtitle="Manage your documents" />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <div className="flex gap-2 items-center">
          {/* Degree Filter */}
          <select
            value={degreeFilter}
            onChange={(e) => { setDegreeFilter(e.target.value as EDegree | "All"); setPage(1); }}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Degrees</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
          </select>

        </div>

        <button
          onClick={handleAdd}
          disabled={createMutation.isPending}
          className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
        >
          <FaPlus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      <EnhancedTable
        data={documents}
        columns={DocumentsColumns}
        actions={tableActions}
        loading={isLoading}
        emptyMessage={isError ? "Failed to load Documents" : "No Documents found"}
      />

      <Pagination page={page} hasNextPage={hasNextPage} totalPages={totalPages} onPageChange={setPage} />

      {/* MODALS */}
      <DeleteDocumentsModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        document={documentToEdit}
      />
      <DocumentForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        documentToEdit={documentToEdit}
        createMutation={createMutation}
        editMutation={editMutation}
      />
    </div>
  );
};

export default DocumentPage;
