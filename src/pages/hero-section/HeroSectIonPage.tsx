import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import { PAGE_LIMIT } from "../../constants";
import Pagination from "../../utils/Pagination";
import useGetHeroImages from "./hooks/useGetHeroImages";
import useAddHeroImage from "./hooks/useAddHeroImage";
import useUpdateHeroImage from "./hooks/useUpdateHeroImage";
import DeleteHeroImageModal from "./components/DeleteHeroImageModal";
import UpdateHeroImageModal from "./components/UpdateHeroImageModal";
import type { HeroSectionImage } from "./model/HeroModel";
import HeroImageCardView from "./components/HeroImageCard";
import AddHeroImageModal from "./components/AddHeroImageModel";
import ToggleHeroStatusModal from "./components/ToggleHeroStatusModel";
import ChangeHeroOrderModal from "./components/ChangeHeroOrderModel";

const HeroSectionPage = () => {
  const [page, setPage] = useState(1);

  const [selectedImage, setSelectedImage] = useState<HeroSectionImage | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { data, isLoading, isError } = useGetHeroImages({ page, limit: PAGE_LIMIT });

  const images = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const enabledCount = images.filter((img) => img.status === "ENABLED").length;

  const addMutation = useAddHeroImage();
  const updateMutation = useUpdateHeroImage();

  const handleEdit = (image: HeroSectionImage) => {
    setSelectedImage(image);
    setShowUpdateModal(true);
  };

  const handleToggle = (image: HeroSectionImage) => {
    setSelectedImage(image);
    setShowToggleModal(true);
  };

  const handleDelete = (image: HeroSectionImage) => {
    setSelectedImage(image);
    setShowDeleteModal(true);
  };

  const handleChangeOrder = (image: HeroSectionImage) => {
    setSelectedImage(image);
    setShowOrderModal(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox
        title="Hero Section"
        subtitle="Manage hero banner images (max 5 enabled)"
      />

      {/* ── Toolbar ── */}
      <div className="flex justify-between items-center my-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
            {enabledCount} / 5 Enabled
          </span>
          <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">
            {total} Total
          </span>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          disabled={addMutation.isPending}
          className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Add Hero Image</span>
        </button>
      </div>

      {/* ── Cards ── */}
      <HeroImageCardView
        images={images}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleEdit}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onChangeOrder={handleChangeOrder}
      />

      <Pagination
        hasNextPage={hasNextPage}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* ── Modals ── */}
      <AddHeroImageModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        mutation={addMutation}
      />

      <UpdateHeroImageModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        image={selectedImage}
        mutation={updateMutation}
      />

      <ToggleHeroStatusModal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        image={selectedImage}
      />

      <ChangeHeroOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        image={selectedImage}
        totalImages={total}
      />

      <DeleteHeroImageModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        image={selectedImage}
      />
    </div>
  );
};

export default HeroSectionPage;