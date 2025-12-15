import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import type { User } from "./model/UserModel";
import useGetUsers from "./hooks/useGetUser";
import ChangeRoleModal from "./components/ChangeRoleModel";
import ResetPasswordModal from "./components/ResetPasswordModel";
import AddEditUserModal from "./components/AddEditUserModel";
import { debounce } from "lodash";
import { userColumns } from "./utils/columns";
import SearchBox from "./utils/SearchBox";
import useCreateUser from "./hooks/useCreateUser";
import useEditUser from "./hooks/useEditUser";
import DeleteUserModal from "./components/DeleteUserModel";
import { Edit, Key, Trash2, UserCog } from "lucide-react";
import Pagination from "../../utils/Pagination";

const PAGE_LIMIT = 10;

const UserPage = () => {
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, isLoading, isError } = useGetUsers({
        page,
        limit: PAGE_LIMIT,
        search: debouncedSearch,
    });

    const users = data?.data ?? [];
    const totalPages = data?.pagination?.totalPages ?? 1;
    const userMutation = useCreateUser();
    const editMutation = useEditUser();
    const handleSearch = debounce((value: string) => {
        setDebouncedSearch(value);
        setPage(1);
    }, 500);

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsEditMode(false);
        setShowAddEditModal(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsEditMode(true);
        setShowAddEditModal(true);
    };

    const handleChangeRole = (user: User) => {
        setSelectedUser(user);
        setShowRoleModal(true);
    };

    const handleResetPassword = (user: User) => {
        setSelectedUser(user);
        setShowResetModal(true);
    };

    const handleDeleteUser = (user: User) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const tableActions = [
        {
            icon: <Edit className="w-5 h-5" />,
            tooltip: "Edit User",
            onClick: handleEditUser,
            color: "text-blue-600 hover:bg-blue-600 hover:text-white"
        },
        {
            icon: <UserCog className="w-5 h-5" />,
            tooltip: "Change Role",
            onClick: handleChangeRole,
            color: "text-purple-600 hover:bg-purple-600 hover:text-white"
        },
        {
            icon: <Key className="w-5 h-5" />,
            tooltip: "Reset Password",
            onClick: handleResetPassword,
            color: "text-amber-600 hover:bg-amber-600 hover:text-white"
        },
        {
            icon: <Trash2 className="w-5 h-5" />,
            tooltip: "Delete User",
            onClick: handleDeleteUser,
            color: "text-red-600 hover:bg-red-600 hover:text-white"
        },
    ];
 const hasNextPage = data?.pagination?.hasNextPage ?? false;


    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
            <TitleBox title="User Management" subtitle="Manage application users" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
                <SearchBox placeholder="Search users..." onSearch={handleSearch} />
                <button
                    onClick={handleAddUser}
                    className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add User</span>
                </button>
            </div>

            <EnhancedTable
                data={users}
                columns={userColumns}
                actions={tableActions}
                loading={isLoading}
                emptyMessage={isError ? "Failed to load users" : "No users found"}
            />

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} hasNextPage={hasNextPage} />

            <AddEditUserModal
                isOpen={showAddEditModal}
                onClose={() => setShowAddEditModal(false)}
                user={selectedUser ?? undefined}
                isEdit={isEditMode}
                mutation={userMutation}
                editMutation={editMutation}
            />

            <ChangeRoleModal
                isOpen={showRoleModal}
                onClose={() => setShowRoleModal(false)}
                user={selectedUser ?? undefined}
            />

            <DeleteUserModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                user={selectedUser}

            />

            <ResetPasswordModal
                isOpen={showResetModal}
                onClose={() => setShowResetModal(false)}
                user={selectedUser ?? undefined}
            />
        </div>
    );
};

export default UserPage;
