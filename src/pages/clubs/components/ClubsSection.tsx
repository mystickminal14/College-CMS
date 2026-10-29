import { useState } from "react";
import { Edit, ImagePlus, Stamp, Trash2 } from "lucide-react";
import EnhancedTable from "../../../template/EnhancedTable";
import Pagination from "../../../utils/Pagination";
import SearchBox from "../../our-teams/utils/SearchBox";
import { IMAGE_URL, PAGE_LIMIT } from "../../../constants";
import fallback from "../../../assets/applogo.webp";
import type { Club } from "../model/ClubModel";
import { useDeleteClub, useGetClubs, useToggleClubStatus, useUploadClubImage } from "../hooks/useClubs";
import { useDebounced } from "../hooks/useDebounced";
import ClubFormModal from "./ClubFormModal";
import ConfirmModal from "./ConfirmModal";
import ImageUpdateModal from "./ImageUpdateModal";

const ClubsSection = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search);

  const [editing, setEditing] = useState<Club | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toDelete, setToDelete] = useState<Club | null>(null);
  const [toToggle, setToToggle] = useState<Club | null>(null);
  const [imageFor, setImageFor] = useState<Club | null>(null);
  const imageMutation = useUploadClubImage();

  const { data, isLoading, isError } = useGetClubs({ search: debouncedSearch, page, limit });
  const deleteMutation = useDeleteClub();
  const statusMutation = useToggleClubStatus();

  const clubs = data?.data ?? [];
  const pagination = data?.pagination;

  const columns = [
    {
      label: "Image",
      accessor: "image",
      render: (row: Club) => (
        <img
          src={row.image ? `${IMAGE_URL}${row.image}` : fallback}
          alt={row.name}
          className="w-16 h-16 rounded-md object-contain border bg-white p-1"
        />
      ),
    },
    { label: "Club Name", accessor: "name" },
    { label: "Members", accessor: "members", render: (row: Club) => row._count?.members ?? 0 },
    { label: "Order", accessor: "order" },
    { label: "Status", accessor: "status" },
  ];

  const actions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Club",
      onClick: (row: Club) => {
        setEditing(row);
        setShowForm(true);
      },
      color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white",
    },
    {
      icon: <ImagePlus className="w-5 h-5" />,
      tooltip: "Update Image",
      onClick: setImageFor,
      color: "text-emerald-600 hover:bg-emerald-600 hover:text-white",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Club",
      onClick: setToDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
    {
      icon: <Stamp className="w-5 h-5" />,
      tooltip: (row: Club) => (row.status === "ENABLED" ? "Disable Club" : "Enable Club"),
      onClick: setToToggle,
      color: (row: Club) =>
        row.status === "ENABLED"
          ? "text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white"
          : "text-red-600 border-red-200 hover:bg-red-600 hover:text-white",
    },
  ];

  const nextStatus = toToggle?.status === "ENABLED" ? "DISABLED" : "ENABLED";

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 justify-between sm:items-center mb-4">
        <SearchBox
          placeholder="Search clubs..."
          onSearch={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow transition-all font-medium"
        >
          + Add Club
        </button>
      </div>

      <EnhancedTable
        data={clubs}
        columns={columns}
        actions={actions}
        loading={isLoading}
        emptyMessage={isError ? "Failed to load clubs" : "No clubs found"}
        total={pagination?.total ?? 0}
      />
      <Pagination
        page={page}
        totalPages={pagination?.totalPages ?? 1}
        hasNextPage={pagination?.hasNextPage ?? false}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={(l) => {
          setLimit(l);
          setPage(1);
        }}
        total={pagination?.total ?? 0}
      />

      <ImageUpdateModal
        isOpen={!!imageFor}
        title={`Update Image: ${imageFor?.name ?? ""}`}
        currentImage={imageFor?.image}
        width={600}
        height={600}
        minWidth={300}
        minHeight={300}
        isPending={imageMutation.isPending}
        onClose={() => setImageFor(null)}
        onSave={(image) => imageFor?.id && imageMutation.mutate({ id: imageFor.id, image }, { onSuccess: () => setImageFor(null) })}
      />

      <ClubFormModal isOpen={showForm} onClose={() => setShowForm(false)} club={editing} />

      <ConfirmModal
        isOpen={!!toDelete}
        danger
        title="Delete Club"
        message={
          <>
            Delete <b className="text-red-600">{toDelete?.name}</b>? All of its members will be deleted too. This cannot be undone.
          </>
        }
        confirmLabel="Delete Club"
        isPending={deleteMutation.isPending}
        onClose={() => setToDelete(null)}
        onConfirm={() => toDelete?.id && deleteMutation.mutate(toDelete.id, { onSuccess: () => setToDelete(null) })}
      />
      <ConfirmModal
        isOpen={!!toToggle}
        title="Change Status"
        message={
          <>
            {nextStatus === "ENABLED" ? "Enable" : "Disable"} <b>{toToggle?.name}</b> on the website?
          </>
        }
        confirmLabel={nextStatus === "ENABLED" ? "Enable" : "Disable"}
        isPending={statusMutation.isPending}
        onClose={() => setToToggle(null)}
        onConfirm={() =>
          toToggle?.id && statusMutation.mutate({ id: toToggle.id, status: nextStatus }, { onSuccess: () => setToToggle(null) })
        }
      />
    </>
  );
};

export default ClubsSection;
