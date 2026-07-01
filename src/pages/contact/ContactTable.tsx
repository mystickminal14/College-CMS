import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import type { Contact } from "./model/ContactModel";

import { debounce } from "lodash";
import { contactColumns } from "./utils/columns";

import { Edit, Trash2, Power } from "lucide-react";
import Pagination from "../../utils/Pagination";
import useGetContacts from "./hooks/useGetUser";
import useCreateContact from "./hooks/useCreateUser";
import useEditContact from "./hooks/useEditUser";
import SearchBox from "./utils/SearchBox";
import AddEditContactModal from "./components/AddEditUserModel";
import DeleteContactModal from "./components/DeleteUserModel";
import ToggleContactStatusModal from "./components/ToggleContact";
import type { STATUS } from "../gallery/model/GallModel";

const PAGE_LIMIT = 10;

const ContactPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<STATUS | "">("");

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);

  const { data, isLoading, isError } = useGetContacts({
    status:selectedStatus || undefined,
    page,
    limit,
    search: debouncedSearch,
  });

  const contacts = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const contactMutation = useCreateContact();
  const editMutation = useEditContact();

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleAddContact = () => {
    setSelectedContact(null);
    setIsEditMode(false);
    setShowAddEditModal(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditMode(true);
    setShowAddEditModal(true);
  };

  const handleDeleteContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const handleToggleStatus = (contact: Contact) => {
    setSelectedContact(contact);
    setShowToggleModal(true);
  };

  const tableActions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Contact",
      onClick: handleEditContact,
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
      tooltip: "Delete Contact",
      onClick: handleDeleteContact,
      color: "text-red-600 hover:bg-red-600 hover:text-white",
    },
  ];
  const statusOptions: STATUS[] = ["ENABLED", "DISABLED"];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox
        title="Contact Management"
        subtitle="Manage application contacts"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
        <SearchBox
          placeholder="Search contacts..."
          onSearch={handleSearch}
        />
   <div className="flex gap-2">
     <select
              className="w-full md:w-auto px-4 py-3 pr-10 text-gray-900 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 cursor-pointer appearance-none transition duration-150 ease-in-out"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value as STATUS | "");
                setPage(1);
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
          onClick={handleAddContact}
          className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center"
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
          <span>Add Contact</span>
        </button>
   </div>
      </div>

      <EnhancedTable
        data={contacts}
        columns={contactColumns}
        actions={tableActions}
        loading={isLoading}
        emptyMessage={
          isError ? "Failed to load contacts" : "No contacts found"
        }
        total={total}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasNextPage={hasNextPage}
        limit={limit}
        onLimitChange={handleLimitChange}
        total={total}
      />

      {/* ADD / EDIT MODAL */}
      <AddEditContactModal
        isOpen={showAddEditModal}
        onClose={() => setShowAddEditModal(false)}
        contact={selectedContact ?? undefined}
        isEdit={isEditMode}
        mutation={contactMutation}
        editMutation={editMutation}
      />

      <DeleteContactModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        contact={selectedContact}
      />

      <ToggleContactStatusModal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        contact={selectedContact}
      />
    </div>
  );
};

export default ContactPage;
