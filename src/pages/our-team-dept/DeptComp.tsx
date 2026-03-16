import { useState } from "react";
import useCreateDept from "./hooks/useCreate";
import useEditDept, { useChangeStatus } from "./hooks/useEdit";
import useGetAllDept from "./hooks/useGetAllDept";
import { PAGE_LIMIT } from "../../constants";
import type { Dept } from "./model/DeptModel";
import { ArrowUp, Edit, Stamp } from "lucide-react";
import SearchBox from "../users/utils/SearchBox";
import { debounce, } from "lodash";
import { FaPlus } from "react-icons/fa";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import ChangeDeptOrderModal from "./components/ChangeOrder";
import AddEditDeptModal from "./components/AddEditDept";
import { DeptColumns } from "./columns";
import StatusModal from "./components/StatusModel";

const DeptComp = () => {
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const createMutation = useCreateDept();
    const { data, isLoading, isError } = useGetAllDept({
        search: debouncedSearch,
        page,
        limit: PAGE_LIMIT,
    });

    const editMutation = useEditDept();
    const [deptToChangeOrder, setDeptToChangeOrder] = useState<Dept | null>(null);
    const [deptToEdit, setDeptToEdit] = useState<Dept | null>(null);
    const [showModal, setShowModal] = useState(false);
    const dept = data?.data ?? [];
    const statusMutation = useChangeStatus();
    const [statusData, setStatusData] = useState<Dept | null>(null);
    const handleStatusChange = (row: Dept) => {
        setStatusData(row);
        setShowStatusModal(true);
    };
    const totalPages = data?.pagination?.totalPages ?? 1;
    const hasNextPage = data?.pagination?.hasNextPage ?? false;
    const handleEdit = (dept: Dept) => { setDeptToEdit(dept); setShowModal(true); };
    const [showOrderModal, setShowOrderModal] = useState(false);
    const handleAdd = (dept?: Dept) => {
        setDeptToEdit(dept ?? null);
        setShowModal(true);
    };
    const tableActions: {
        icon: React.ReactNode | ((row: Dept) => React.ReactNode);
        tooltip: string | ((row: Dept) => string);
        onClick: (row: Dept) => void;
        color?: string | ((row: Dept) => string);

        condition?: (row: Dept) => boolean;
    }[] = [
            {
                icon: <Edit className="w-4 h-4" />,
                tooltip: "Edit Dept",
                onClick: handleEdit,
                color: "text-[#135EAB]"
            },
            {
                icon: <ArrowUp className="w-4 h-4" />,
                tooltip: "Change Order",
                onClick: (dept) => {
                    setDeptToChangeOrder(dept);
                    setShowOrderModal(true);
                },
                color: "text-purple-600",
            },
            {
                icon: <Stamp className="w-5 h-5" />,
                tooltip: (row) =>
                    row.status === "ENABLED" ? "Disable Category" : "Enable Category",
                onClick: handleStatusChange,
                color: (row) =>
                    row.status === "ENABLED"
                        ? "text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white"
                        : "text-red-600 border-red-200 hover:bg-red-600 hover:text-white",
            }
        ]; const handleSearch = debounce((value: string) => {
            setDebouncedSearch(value);
            setPage(1);
        }, 500);
    const [showStatusModal, setShowStatusModal] = useState(false);

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
                <SearchBox placeholder="Search ..." onSearch={handleSearch} />
                <button
                    onClick={() => handleAdd()}
                    disabled={createMutation.isPending}
                    className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c]  flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
                >
                    <FaPlus className="w-4 h-4" />
                    <span>Add</span>
                </button>
            </div>
            <div className="mt-1">
                <EnhancedTable
                    data={dept}
                    columns={DeptColumns}
                    actions={tableActions}
                    loading={isLoading}
                    emptyMessage={isError ? "Failed to load Depts" : "No Depts found"}
                />
            </div>
            <Pagination page={page} hasNextPage={hasNextPage} totalPages={totalPages} onPageChange={setPage} />
            <ChangeDeptOrderModal
                isOpen={showOrderModal}
                onClose={() => setShowOrderModal(false)}
                dept={deptToChangeOrder}
                maxOrder={dept.length}
            />
            <AddEditDeptModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                type={deptToEdit ?? undefined}
                isEdit={!!deptToEdit}
                mutation={createMutation}
                editMutation={editMutation}
            />
            <StatusModal
                isOpen={showStatusModal}
                onClose={() => setShowStatusModal(false)}
                data={statusData}
                mutation={statusMutation}
            />
        </div>
    )
}

export default DeptComp
