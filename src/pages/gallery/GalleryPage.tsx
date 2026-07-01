import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import DeleteGallerysModal from "./components/DeleteModel";
import type { Gallerys, GalleryType, STATUS } from "./model/GallModel";
import GallerysCardView from "./components/GalleryCardView";
import GalleryImageUploadForm from "./components/Wizard";
import useGetGallerys from "./hooks/useGetAll";
import { PAGE_LIMIT } from "../../constants";
import Pagination from "../../utils/Pagination";
import { FaTable, FaThLarge } from "react-icons/fa";
import { Edit, Power, Trash2 } from "lucide-react";
import useGetGalleryTypes from "./hooks/type/useGetGalleryType";
import DeleteGalleryTypeModal from "./components/type/addDelete";
import AddEditGalleryTypeModal from "./components/type/addEdit";
import { useUpdateImages } from "./hooks/useUpdateImage";
import EnhancedTable from "../../template/EnhancedTable";
import { TypeColumns } from "./services/columns";
import { useCreateGalleryType } from "./hooks/type/useCreate";
import { useUpdateGalleryType } from "./hooks/type/usUpdate";
import { debounce } from "lodash";
import SearchBox from "../users/utils/SearchBox";
import useGetAllGalleryTypes from "./hooks/type/useGetGalleryTypeAll";
import ToggleStatusModel from "./components/toggle-type";

const GallerysPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteTypeModal, setShowDeleteTypeModal] = useState(false);

  const [galleryToDelete, setGalleryToDelete] = useState<Gallerys | null>(null);
  const [typeToEdit, setTypeToEdit] = useState<GalleryType | null>(null);
  const [typeToDelete, setTypeToDelete] = useState<GalleryType | null>(null);

  const [viewMode, setViewMode] = useState<"type" | "photo">("photo");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [typePage, setTypePage] = useState(1);
  const [typeLimit, setTypeLimit] = useState(PAGE_LIMIT);

  const [selectedStatus, setSelectedStatus] = useState<STATUS | "">("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setTypePage(1);
  }, 500);

  const [selectedTypeId, setSelectedTypeId] = useState<number | undefined>(undefined);

  const { data: galleryData, isLoading: galleryLoading, isError: galleryError } =
    useGetGallerys({
      page,
      limit,
      typeId: selectedTypeId,
    });

  const gallerys = galleryData?.data ?? [];
  const totalPages = galleryData?.pagination?.totalPages ?? 1;
  const hasNextPage = galleryData?.pagination?.hasNextPage ?? false;
  const total = galleryData?.pagination?.total ?? 0;

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const updateImageMutation = useUpdateImages();
  const addMutation = useCreateGalleryType();
  const editTypeMutation = useUpdateGalleryType();

  const { data: typesDataAll } = useGetGalleryTypes(); // For table view (all types)
  const { data: typesData } = useGetAllGalleryTypes({
    page: typePage,
    limit: typeLimit,
    search: debouncedSearch,
    status: selectedStatus, // ✅ pass status here
  });

  const galleryTypesAll = typesDataAll?.data ?? [];
  const galleryTypes = typesData?.data ?? [];
  const typeTotalPages = typesData?.pagination?.totalPages ?? 1;
  const typeHasNextPage = typesData?.pagination?.hasNextPage ?? false;
  const typeTotal = typesData?.pagination?.total ?? 0;

  const handleTypeLimitChange = (newLimit: number) => {
    setTypeLimit(newLimit);
    setTypePage(1);
  };

  const handleAddGallery = () => setShowModal(true);

  const handleEditType = (type: GalleryType) => {
    setTypeToEdit(type);
    setShowTypeModal(true);
  };

  const handleAddType = () => {
    setTypeToEdit(null);
    setShowTypeModal(true);
  };

  const handleDeleteGallery = (item: Gallerys) => {
    setGalleryToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteType = (type: GalleryType) => {
    setTypeToDelete(type);
    setShowDeleteTypeModal(true);
  };

  const [showToggleModal, setShowToggleModal] = useState(false);
  const [selectedGalleryType, setSelectedGalleryType] = useState<GalleryType | null>(null);

  const handleToggleStatus = (galleryType: GalleryType) => {
    setSelectedGalleryType(galleryType);
    setShowToggleModal(true);
  };

  const tableActions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit",
      onClick: handleEditType,
      color: "text-blue-600 hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <Power className="w-5 h-5" />,
      tooltip: "Toggle Status",
      onClick: handleToggleStatus,
      color: "text-yellow-600 hover:bg-yellow-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete",
      onClick: handleDeleteType,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];

  const statusOptions: STATUS[] = ["ENABLED", "DISABLED"];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Gallery Management" subtitle="Upload and manage gallery images" />

      {/* --- Toolbar --- */}
      <div className="flex justify-between items-center my-6">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("type")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${
              viewMode === "type"
                ? "bg-linear-to-r from-[#125DAA] to-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Gallery Name</span>
          </button>
          <button
            onClick={() => setViewMode("photo")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${
              viewMode === "photo"
                ? "bg-linear-to-r from-[#125DAA] to-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaThLarge className="w-4 h-4" />
            <span>Photos</span>
          </button>
        </div>

        {viewMode === "photo" ? (
          <div className="flex gap-4">
            <select
              className="w-full md:w-auto px-4 py-3 pr-10 text-gray-900 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 cursor-pointer appearance-none transition duration-150 ease-in-out"
              value={selectedTypeId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedTypeId(val ? Number(val) : undefined);
                setPage(1);
              }}
            >
              <option value="">All Types</option>
              {galleryTypesAll.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddGallery}
              disabled={updateImageMutation.isPending}
              className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
            >
              <span>Add Gallery</span>
            </button>
          </div>
        ) : (
          <>
            <SearchBox placeholder="Search Types..." onSearch={handleSearch} />

            <div className="flex gap-4">
              <select
                className="w-full md:w-auto px-4 py-3 pr-10 text-gray-900 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 cursor-pointer appearance-none transition duration-150 ease-in-out"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value as STATUS | "");
                  setTypePage(1);
                }}
              >
                <option value="">All Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddType}
                className="px-6 py-3 bg-[#125DAA] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
              >
                <span>Add Gallery Name</span>
              </button>
            </div>
          </>
        )}
      </div>

      <div>
        {viewMode === "photo" ? (
          <>
            <GallerysCardView
              gallerys={gallerys}
              isLoading={galleryLoading}
              isError={galleryError}
              onDelete={handleDeleteGallery}
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
          </>
        ) : (
          <>
            <EnhancedTable
              data={galleryTypes}
              columns={TypeColumns}
              actions={tableActions}
              loading={galleryLoading}
              emptyMessage={galleryError ? "Failed to load types" : "No types found"}
              total={typeTotal}
            />
            <Pagination
              hasNextPage={typeHasNextPage}
              page={typePage}
              totalPages={typeTotalPages}
              onPageChange={setTypePage}
              limit={typeLimit}
              onLimitChange={handleTypeLimitChange}
              total={typeTotal}
            />
          </>
        )}
      </div>

      {/* --- Modals --- */}
      <ToggleStatusModel
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        contact={selectedGalleryType} // ✅ pass selected type
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
      <AddEditGalleryTypeModal
        isOpen={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        type={typeToEdit ?? undefined}
        isEdit={!!typeToEdit}
        mutation={addMutation}
        editMutation={editTypeMutation}
      />
      <DeleteGalleryTypeModal
        isOpen={showDeleteTypeModal}
        onClose={() => setShowDeleteTypeModal(false)}
        type={typeToDelete}
      />
    </div>
  );
};

export default GallerysPage;
