import { useState } from "react";
import { Edit, ImagePlus, Stamp, Trash2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import EnhancedTable from "../../../template/EnhancedTable";
import Pagination from "../../../utils/Pagination";
import SearchBox from "../../our-teams/utils/SearchBox";
import { IMAGE_URL, PAGE_LIMIT } from "../../../constants";
import avatar from "../../../assets/applogo.webp";
import type { ClubMember } from "../model/ClubModel";
import { useDeleteClubMember, useGetClubMembers, useToggleMemberStatus, useUploadMemberPhoto } from "../hooks/useClubMembers";
import { useGetClubNames } from "../hooks/useClubs";
import MemberFormModal from "./MemberFormModal";
import ConfirmModal from "./ConfirmModal";
import ImageUpdateModal from "./ImageUpdateModal";
import { useDebounced } from "../hooks/useDebounced";

const MembersSection = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [search, setSearch] = useState("");
  const [clubId, setClubId] = useState<number | undefined>();
  const debouncedSearch = useDebounced(search);

  const [editing, setEditing] = useState<ClubMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toDelete, setToDelete] = useState<ClubMember | null>(null);
  const [toToggle, setToToggle] = useState<ClubMember | null>(null);
  const [imageFor, setImageFor] = useState<ClubMember | null>(null);
  const imageMutation = useUploadMemberPhoto();

  const { data, isLoading, isError } = useGetClubMembers({ search: debouncedSearch, clubId, page, limit });
  const { data: clubRes } = useGetClubNames();
  const deleteMutation = useDeleteClubMember();
  const statusMutation = useToggleMemberStatus();

  const members = data?.data ?? [];
  const pagination = data?.pagination;
  const clubs = clubRes?.data ?? [];

  const columns = [
    {
      label: "Photo",
      accessor: "image",
      render: (row: ClubMember) => (
        <img
          src={row.image ? `${IMAGE_URL}${row.image}` : avatar}
          alt={row.name}
          className="w-16 h-16 rounded-md object-cover object-top border shadow-sm"
        />
      ),
    },
    {
      label: "Name",
      accessor: "name",
      render: (row: ClubMember) => (
        <div className="flex items-center gap-2">
          <span>{row.name}</span>
          {row.isPresident && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">President</span>
          )}
        </div>
      ),
    },
    { label: "Club", accessor: "club", render: (row: ClubMember) => row.club?.name ?? "—" },
    { label: "Designation", accessor: "designation" },
    { label: "Semester", accessor: "semester" },
    {
      label: "LinkedIn",
      accessor: "linkedIn",
      render: (row: ClubMember) =>
        row.linkedIn ? (
          <a href={row.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] text-xl">
            <FaLinkedin />
          </a>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    { label: "Status", accessor: "status" },
  ];

  const actions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Member",
      onClick: (row: ClubMember) => {
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
      tooltip: "Delete Member",
      onClick: setToDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
    {
      icon: <Stamp className="w-5 h-5" />,
      tooltip: (row: ClubMember) => (row.status === "ENABLED" ? "Disable Member" : "Enable Member"),
      onClick: setToToggle,
      color: (row: ClubMember) =>
        row.status === "ENABLED"
          ? "text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white"
          : "text-red-600 border-red-200 hover:bg-red-600 hover:text-white",
    },
  ];

  const nextStatus = toToggle?.status === "ENABLED" ? "DISABLED" : "ENABLED";

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center mb-4">
        <SearchBox
          placeholder="Search members..."
          onSearch={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        <div className="flex gap-2">
          <select
            className="w-full md:w-auto px-4 py-3 text-gray-900 text-sm bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
            value={clubId ?? ""}
            onChange={(e) => {
              setClubId(e.target.value ? Number(e.target.value) : undefined);
              setPage(1);
            }}
          >
            <option value="">All Clubs</option>
            {clubs.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow transition-all font-medium whitespace-nowrap"
          >
            + Add Member
          </button>
        </div>
      </div>

      <EnhancedTable
        data={members}
        columns={columns}
        actions={actions}
        loading={isLoading}
        emptyMessage={isError ? "Failed to load members" : "No members found"}
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
        width={800}
        height={800}
        minWidth={400}
        minHeight={400}
        isPending={imageMutation.isPending}
        onClose={() => setImageFor(null)}
        onSave={(image) => imageFor?.id && imageMutation.mutate({ id: imageFor.id, image }, { onSuccess: () => setImageFor(null) })}
      />

      <MemberFormModal isOpen={showForm} onClose={() => setShowForm(false)} member={editing} defaultClubId={clubId} />

      <ConfirmModal
        isOpen={!!toDelete}
        danger
        title="Delete Member"
        message={
          <>
            Delete <b className="text-red-600">{toDelete?.name}</b>? This cannot be undone.
          </>
        }
        confirmLabel="Delete Member"
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

export default MembersSection;
