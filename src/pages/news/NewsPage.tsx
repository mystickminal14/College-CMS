import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import { PAGE_LIMIT } from "../../constants";
import { useUpdateImage } from "./hooks/useUpdateImage";
import { Edit, Trash2 } from "lucide-react";
import useCreateNews from "./hooks/useCreateNews";
import type { NewsModel } from "./model/NewsModel";
import useGetNews from "./hooks/useGetAllNews";
import useEditNews from "./hooks/useEditNews";
import { NewsModelColumns } from "./utils/columns";

import AddEditNewsWizardModal from "./components/NewsWizard";
import { useUploadNewsImage } from "./hooks/useUploadImage";
import DeleteNewsModel from "./components/DeleteNews";
import Pagination from "../../utils/Pagination";

const NewsPage = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newsToEdit, setNewsToEdit] = useState<NewsModel | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useGetNews({ page, limit: PAGE_LIMIT });

  const createMutation = useCreateNews();
  const editMutation = useEditNews();
  const uploadImageMutation = useUploadNewsImage();
  const updateImageMutation = useUpdateImage();

  const news = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handleAdd = () => {
    setNewsToEdit(null);
    setShowModal(true);
  };

  const handleEdit = (item: NewsModel) => {
    setNewsToEdit(item);
    setShowModal(true);
  };

  const handleDeleteNews = (item: NewsModel) => {
    setNewsToEdit(item);
    setShowDeleteModal(true);
  };

  const tableActions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit News",
      onClick: handleEdit,
      color: "text-[#1a7cd3] hover:bg-[#1a7cd3] hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete News",
      onClick: handleDeleteNews,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];
 const hasNextPage = data?.pagination?.hasNextPage ?? false;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="News Management" subtitle="Manage application news" />

      {/* ADD BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
        <button
          onClick={handleAdd}
          disabled={createMutation.isPending}
          className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] 
                     flex items-center space-x-2 shadow hover:shadow-md transition-all 
                     duration-200 font-medium w-full md:w-auto justify-center 
                     disabled:opacity-50"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add News</span>
        </button>
      </div>

      {/* TABLE */}
      <EnhancedTable
        data={news}
        columns={NewsModelColumns}
        actions={tableActions}
        loading={isLoading}
        emptyMessage={isError ? "Failed to load news" : "No news found"}
      />

      <Pagination page={page} hasNextPage={hasNextPage} totalPages={totalPages} onPageChange={setPage} />

      {/* DELETE MODAL */}
      <DeleteNewsModel
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        news={newsToEdit}
      />

      {/* WIZARD MODAL */}
      <AddEditNewsWizardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        newsToEdit={newsToEdit}
        createMutation={createMutation}
        editMutation={editMutation}
        uploadImageMutation={uploadImageMutation}
        updateImageMutation={updateImageMutation}
      />
    </div>
  );
};

export default NewsPage;
