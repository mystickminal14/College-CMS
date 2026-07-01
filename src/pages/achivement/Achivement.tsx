import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import type { Achivement } from "./model/AchivementModel";

import { achivementColumns } from "./utils/columns";

import { Edit,  Trash2,  } from "lucide-react";
import Pagination from "../../utils/Pagination";
import useGetAchivements from "./hooks/useGet";
import useCreateAchivement from "./hooks/useCreate";
import useEditAchivement from "./hooks/useEditUser";
import AddEditAchivementModal from "./components/AddEditUserModel";
import DeleteAchivementModal from "./components/DeleteUserModel";

const PAGE_LIMIT = 10;

const AchivementPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(PAGE_LIMIT);
    const [selectedAchivement, setSelectedAchivement] = useState<Achivement | null>(null);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, isLoading, isError } = useGetAchivements({
        page,
        limit,
    });

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const achivements = data?.data ?? [];
    const totalPages = data?.pagination?.totalPages ?? 1;
    const total = data?.pagination?.total ?? 0;
    const achivementMutation = useCreateAchivement();
    const editMutation = useEditAchivement();

    const handleAddAchivement = () => {
        setSelectedAchivement(null);
        setIsEditMode(false);
        setShowAddEditModal(true);
    };

    const handleEditAchivement = (achivement: Achivement) => {
        setSelectedAchivement(achivement);
        setIsEditMode(true);
        setShowAddEditModal(true);
    };





    const handleDeleteAchivement = (achivement: Achivement) => {
        setSelectedAchivement(achivement);
        setShowDeleteModal(true);
    };

    const tableActions = [
        {
            icon: <Edit className="w-5 h-5" />,
            tooltip: "Edit Achivement",
            onClick: handleEditAchivement,
            color: "text-blue-600 hover:bg-blue-600 hover:text-white"
        },
      
        {
            icon: <Trash2 className="w-5 h-5" />,
            tooltip: "Delete Achivement",
            onClick: handleDeleteAchivement,
            color: "text-red-600 hover:bg-red-600 hover:text-white"
        },
    ];
 const hasNextPage = data?.pagination?.hasNextPage ?? false;


    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
            <TitleBox title="Achivement Management" subtitle="Manage application achivements" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
                <button
                    onClick={handleAddAchivement}
                    className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Achivement</span>
                </button>
            </div>

            <EnhancedTable
                data={achivements}
                columns={achivementColumns}
                actions={tableActions}
                loading={isLoading}
                emptyMessage={isError ? "Failed to load achivements" : "No achivements found"}
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

            <AddEditAchivementModal
                isOpen={showAddEditModal}
                onClose={() => setShowAddEditModal(false)}
                achivement={selectedAchivement ?? undefined}
                isEdit={isEditMode}
                mutation={achivementMutation}
                editMutation={editMutation}
            />

           

            <DeleteAchivementModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                achivement={selectedAchivement}

            />

         
        </div>
    );
};

export default AchivementPage;
