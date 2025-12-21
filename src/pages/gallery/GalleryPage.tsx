import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import DeleteGallerysModal from "./components/DeleteModel";
import type { Gallerys } from "./model/GallModel";
import { useUpdateimage } from "./hooks/useUpdateImage";
import GallerysCardView from "./components/GalleryCardView";
import GalleryImageUploadForm from "./components/Wizard";
import useGetGallerys from "./hooks/useGetAll";
import { PAGE_LIMIT } from "../../constants";
import Pagination from "../../utils/Pagination";

const GallerysPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState<Gallerys | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetGallerys({    page,
      limit: PAGE_LIMIT,});
  const gallerys = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const updateImageMutation = useUpdateimage();

  const handleAdd = () => setShowModal(true);

  const handleDelete = (item: Gallerys) => {
    setGalleryToDelete(item);
    setShowDeleteModal(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2 ">
      <TitleBox
        title="Gallerys Management"
        subtitle="Upload and manage gallery images"
      />

      <div className="flex justify-between items-center my-6">
        <button
          onClick={handleAdd}
          disabled={updateImageMutation.isPending}
          className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
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
          <span>Add Gallery</span>
        </button>
      </div>

      <GallerysCardView
        gallerys={gallerys}
        isLoading={isLoading}
        isError={isError}
        onDelete={handleDelete}
      />
 {/* Pagination */}
      <Pagination
        hasNextPage={hasNextPage}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <DeleteGallerysModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        gallery={galleryToDelete}
      />

      <GalleryImageUploadForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        updateImageMutation={updateImageMutation}
      />
    </div>
  );
};

export default GallerysPage;
