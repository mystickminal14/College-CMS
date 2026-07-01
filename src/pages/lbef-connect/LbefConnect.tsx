import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import Pagination from "../../utils/Pagination";
import DeleteConnectsModal from "./components/DeleteModel";
import ConnectUploadWizard from "./components/Wizard";
import useGetConnects from "./hooks/useGetAll";
import { useUpdateimageConnect } from "./hooks/useUpdateImage";
import { useUploadConnectImage } from "./hooks/uploadConnect";
import { useUpdateImage } from "./hooks/updateConnect";
import { useEditConnect } from "./hooks/useEditConnect"; // 👈 new
import { PAGE_LIMIT } from "../../constants";
import EnhancedTable from "../../template/EnhancedTable";
import { ConnectsColumns } from "./utils/columns";
import type { Connects } from "./model/Connects";
import { Trash2, ImageIcon, Pencil } from "lucide-react"; // 👈 Pencil added
import { FaPlus } from "react-icons/fa";
import UpdateConnectImage from "./components/updateImage";
import EditConnectForm from "./components/EditConnect";

const ConnectsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [showAddModal, setShowAddModal] = useState(false);
  const [connectToDelete, setConnectToDelete] = useState<Connects | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [connectToUpdate, setConnectToUpdate] = useState<Connects | null>(null);
  const [connectToEdit, setConnectToEdit] = useState<Connects | null>(null); // 👈 new

  const { data, isLoading, isError } = useGetConnects({ page, limit });

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const createConnectMutation = useUpdateimageConnect();
  const uploadImageMutation = useUploadConnectImage();
  const updateImageMutation = useUpdateImage();
  const editConnectMutation = useEditConnect(); // 👈 new

  const connects = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const tableActions = [
    {
      icon: <Pencil className="w-5 h-5" />,
      tooltip: "Edit Connect",
      onClick: (item: Connects) => setConnectToEdit(item),
      color: "text-green-600 cursor-pointer hover:bg-green-600 hover:text-white",
    },
    {
      icon: <ImageIcon className="w-5 h-5" />,
      tooltip: "Update Image",
      onClick: (item: Connects) => setConnectToUpdate(item),
      color: "text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Connect",
      onClick: (item: Connects) => {
        setConnectToDelete(item);
        setShowDeleteModal(true);
      },
      color: "text-red-600 cursor-pointer hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Connects Management" subtitle="Manage application connects" />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
        >
          <FaPlus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      <EnhancedTable
        data={connects}
        columns={ConnectsColumns}
        actions={tableActions}
        loading={isLoading}
        emptyMessage={isError ? "Failed to load Connects" : "No Connects found"}
        total={total}
      />

      <Pagination
        hasNextPage={hasNextPage}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={handleLimitChange}
        total={total}
      />

      <DeleteConnectsModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        connect={connectToDelete}
      />

      <ConnectUploadWizard
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        createConnectMutation={createConnectMutation}
        uploadImageMutation={uploadImageMutation}
      />

      {connectToUpdate && (
        <UpdateConnectImage
          connectId={connectToUpdate.id ?? 0}
          isOpen={!!connectToUpdate}
          onClose={() => setConnectToUpdate(null)}
          updateImageMutation={updateImageMutation}
        />
      )}

      {/* 👇 Edit modal */}
      {connectToEdit && (
        <EditConnectForm
          isOpen={!!connectToEdit}
          onClose={() => setConnectToEdit(null)}
          connect={connectToEdit}
          editConnectMutation={editConnectMutation}
        />
      )}
    </div>
  );
};

export default ConnectsPage;