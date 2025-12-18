import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import type { Contact } from "./model/ContactModel";

import { debounce } from "lodash";
import { contactColumns } from "./utils/columns";

import { Edit,  Trash2,  } from "lucide-react";
import Pagination from "../../utils/Pagination";
import useGetContacts from "./hooks/useGetUser";
import useCreateContact from "./hooks/useCreateUser";
import useEditContact from "./hooks/useEditUser";
import SearchBox from "./utils/SearchBox";
import AddEditContactModal from "./components/AddEditUserModel";
import DeleteContactModal from "./components/DeleteUserModel";

const PAGE_LIMIT = 10;

const ContactPage = () => {
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, isLoading, isError } = useGetContacts({
        page,
        limit: PAGE_LIMIT,
        search: debouncedSearch,
    });

    const contacts = data?.data ?? [];
    const totalPages = data?.pagination?.totalPages ?? 1;
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

    const tableActions = [
        {
            icon: <Edit className="w-5 h-5" />,
            tooltip: "Edit Contact",
            onClick: handleEditContact,
            color: "text-blue-600 hover:bg-blue-600 hover:text-white"
        },
      
        {
            icon: <Trash2 className="w-5 h-5" />,
            tooltip: "Delete Contact",
            onClick: handleDeleteContact,
            color: "text-red-600 hover:bg-red-600 hover:text-white"
        },
    ];
 const hasNextPage = data?.pagination?.hasNextPage ?? false;


    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
            <TitleBox title="Contact Management" subtitle="Manage application contacts" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
                <SearchBox placeholder="Search contacts..." onSearch={handleSearch} />
                <button
                    onClick={handleAddContact}
                    className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Contact</span>
                </button>
            </div>

            <EnhancedTable
                data={contacts}
                columns={contactColumns}
                actions={tableActions}
                loading={isLoading}
                emptyMessage={isError ? "Failed to load contacts" : "No contacts found"}
            />

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} hasNextPage={hasNextPage} />

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

         
        </div>
    );
};

export default ContactPage;
