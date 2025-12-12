import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import { debounce } from "lodash";
import SearchBox from "./utils/SearchBox";
import Pagination from "./utils/Pagination";
import { PAGE_LIMIT } from "../../constants";
import useGetAlumni from "./hooks/useGetAllAlumni";
import type { Alumni } from "./model/AlumniModel";
import { AlumniColumns } from "./utils/columns";
import { ImagePlus, ImageUp, Pencil } from "lucide-react";
import AddAlumniWizardModal from "./components/AddEditUserModel";

const AlumniPage = () => {
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, isLoading, isError } = useGetAlumni({
        page,
        limit: PAGE_LIMIT,
        search: debouncedSearch,
    });

    const Alumni = data?.data ?? [];
    const totalPages = data?.pagination?.totalPages ?? 1;

    const handleSearch = debounce((value: string) => {
        setDebouncedSearch(value);
        setPage(1);
    }, 500);

    const handleAddAlumni = () => {
        setSelectedAlumni(null);
        setIsEditMode(false);
        setShowAddEditModal(true);
    };

    const handleEditAlumni = (alumni: Alumni) => {
        setSelectedAlumni(alumni);
        setIsEditMode(true);
        setShowAddEditModal(true);
    };

    const handleUploadImage = (alumni: Alumni) => {
        setSelectedAlumni(alumni);
        setIsEditMode(true); 
        setShowAddEditModal(true);
    };

    const handleUpdateImage = (alumni: Alumni) => {
        setSelectedAlumni(alumni);
        setIsEditMode(true);
        setShowAddEditModal(true);
    };

    const tableActions = [
        {
            icon: <Pencil className="w-5 h-5" />,
            tooltip: "Edit Alumni",
            onClick: handleEditAlumni,
            color: "text-[#135EAB]",
        },
        {
            icon: (row: Alumni) =>
                row.image ? (
                    <ImageUp className="w-5 h-5" />
                ) : (
                    <ImagePlus className="w-5 h-5" />
                ),

            tooltip: (row: Alumni) =>
                row.image ? "Update Image" : "Upload Image",

            onClick: (row: Alumni) =>
                row.image ? handleUpdateImage(row) : handleUploadImage(row),

            color: "text-[#135EAB]",
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-1 md:p-4">
            <TitleBox title="Alumni Management" subtitle="Manage application Alumni" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
                <SearchBox placeholder="Search Alumni..." onSearch={handleSearch} />

                <button
                    onClick={handleAddAlumni}
                    className="px-5 py-2.5 bg-[#135EAB] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Alumni</span>
                </button>
            </div>

            <EnhancedTable
                data={Alumni}
                columns={AlumniColumns}
                actions={tableActions}
                loading={isLoading}
                emptyMessage={isError ? "Failed to load Alumni" : "No Alumni found"}
            />

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

            {/* ✅ Add Edit Modal */}
            {showAddEditModal && (
                <AddAlumniWizardModal
                    isOpen={showAddEditModal}
                    onClose={() => setShowAddEditModal(false)}
                    alumni={selectedAlumni}
                    isEdit={isEditMode}
                />
            )}
        </div>
    );
};

export default AlumniPage;
