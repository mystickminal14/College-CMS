import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";

import { PAGE_LIMIT } from "../../constants";
import useGetRecognitions from "./hooks/useGetAll";
import { RecognitionsColumns } from "./utils/columns";
import useCreateRecognitions from "./hooks/useCreateRecogntion";
import useEditRecognitions from "./hooks/useEdit";
import AddEditRecognitionsWizardModal from "./components/Wizard";
import { useUpdateImage } from "./hooks/useUpdateImage";
import DeleteRecognitionsModal from "./components/DeleteModel";
import type { Recognitions } from "./model/RecognitionsModel";
import { Edit, Trash2 } from "lucide-react";
import { useUploadRecognitionsImage } from "./hooks/useUploadAlumni";
import Pagination from "../../utils/Pagination";
import RecognitionsCardView from "../recognitions/components/RecognitionCard";

const RecognitionsPage = () => {
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [RecognitionsToEdit, setRecognitionsToEdit] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [viewMode, setViewMode] = useState<"table" | "card">("table");

    const { data, isLoading, isError } = useGetRecognitions({ page, limit: PAGE_LIMIT });
    const createMutation = useCreateRecognitions();
    const editMutation = useEditRecognitions();
    const uploadImageMutation = useUploadRecognitionsImage();
    const updateImageMutation = useUpdateImage();

    const Recognitions = data?.data ?? [];
    const totalPages = data?.pagination?.totalPages ?? 1;

    const handleAdd = () => { setRecognitionsToEdit(null); setShowModal(true); };
    const handleEdit = (Recognitions: Recognitions) => { setRecognitionsToEdit(Recognitions); setShowModal(true); };

    const handleDeleteUser = (Recognitions: Recognitions) => {
        setRecognitionsToEdit(Recognitions);
        setShowDeleteModal(true);
    };

    const tableActions = [

        {
            icon: <Edit className="w-5 h-5" />,
            tooltip: "Edit Recognitions",
            onClick: handleEdit,
            color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white"
        },
        {
            icon: <Trash2 className="w-5 h-5" />,
            tooltip: "Delete Recognitions",
            onClick: handleDeleteUser,
            color: "text-red-600 hover:bg-red-600 hover:text-white"
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-1 md:p-2">
            <TitleBox title="Recognitions Management" subtitle="Manage application Recognitions" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
                <button onClick={handleAdd} disabled={createMutation.isPending} className="px-5 py-2.5 bg-[#135EAB] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center disabled:opacity-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    <span>Add Recognitions</span>
                </button>
            </div>
            {viewMode === "table" ? (
                <EnhancedTable data={Recognitions} columns={RecognitionsColumns} actions={tableActions} loading={isLoading} emptyMessage={isError ? "Failed to load Recognitions" : "No Recognitions found"} />

            ) : (
                <RecognitionsCardView
                    Recognitions={Recognitions}
                    isLoading={isLoading}
                    isError={isError}
                    onDelete={handleDeleteUser}
                />
            )}
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            <DeleteRecognitionsModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                Recognitions={RecognitionsToEdit}

            />

            <AddEditRecognitionsWizardModal updateImageMutation={updateImageMutation} isOpen={showModal} onClose={() => setShowModal(false)} recognitionsToEdit={RecognitionsToEdit} createMutation={createMutation} editMutation={editMutation} uploadImageMutation={uploadImageMutation} />
        </div>
    );
};

export default RecognitionsPage;
