import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import { debounce } from "lodash";
import SearchBox from "./utils/SearchBox";
import { PAGE_LIMIT } from "../../constants";
import useGetAlumni from "./hooks/useGetAllAlumni";
import { AlumniColumns } from "./utils/columns";
import useCreateAlumni from "./hooks/useCreateAlumni";
import useEditAlumni from "./hooks/useEditAlumni";
import { useUploadAlumniImage } from "./hooks/useUploadAlumni";
import AddEditAlumniWizardModal from "./components/AlumniWizard";
import { useUpdateImage } from "./hooks/useUpdateImage";
import DeleteAlumniModal from "./components/DeleteAlumni";
import type { Alumni } from "./model/AlumniModel";
import { Edit, Trash2 } from "lucide-react";
import Pagination from "../../utils/Pagination";

const AlumniPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(PAGE_LIMIT);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [alumniToEdit, setAlumniToEdit] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, isLoading, isError } = useGetAlumni({ page, limit, search: debouncedSearch });
    const createMutation = useCreateAlumni();
    const editMutation = useEditAlumni();
    const uploadImageMutation = useUploadAlumniImage();
    const updateImageMutation = useUpdateImage();

    const alumni = data?.data ?? [];
    const totalPages = data?.pagination?.totalPages ?? 1;
    const hasNextPage = data?.pagination?.hasNextPage ?? false;
    const total = data?.pagination?.total ?? 0;
    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };
    const handleSearch = debounce((value: string) => { setDebouncedSearch(value); setPage(1); }, 500);
    const handleAdd = () => { setAlumniToEdit(null); setShowModal(true); };
    const handleEdit = (alumni: Alumni) => { setAlumniToEdit(alumni); setShowModal(true); };

    const handleDeleteUser = (alumni: Alumni) => {
        setAlumniToEdit(alumni);
        setShowDeleteModal(true);
    };

    const tableActions = [

        {
            icon: <Edit className="w-5 h-5" />,
            tooltip: "Edit Alumni",
            onClick: handleEdit,
            color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white"
        },
        {
            icon: <Trash2 className="w-5 h-5" />,
            tooltip: "Delete Alumni",
            onClick: handleDeleteUser,
            color: "text-red-600 hover:bg-red-600 hover:text-white"
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
            <TitleBox title="Alumni Management" subtitle="Manage application Alumni" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
                <SearchBox placeholder="Search Alumni..." onSearch={handleSearch} />
                <button onClick={handleAdd} disabled={createMutation.isPending} className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center disabled:opacity-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    <span>Add Alumni</span>
                </button>
            </div>
            <EnhancedTable data={alumni} columns={AlumniColumns} actions={tableActions} loading={isLoading} emptyMessage={isError ? "Failed to load Alumni" : "No Alumni found"} total={total} />
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                hasNextPage={hasNextPage}
                limit={limit}
                onLimitChange={handleLimitChange}
                total={total}
            />
            <DeleteAlumniModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                alumni={alumniToEdit}

            />
            <AddEditAlumniWizardModal updateImageMutation={updateImageMutation} isOpen={showModal} onClose={() => setShowModal(false)} alumniToEdit={alumniToEdit} createMutation={createMutation} editMutation={editMutation} uploadImageMutation={uploadImageMutation} />
        </div>
    );
};

export default AlumniPage;
