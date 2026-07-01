import { useState } from "react";
import useCreateCourseCategory from "./hooks/useCreate";
import useEditCourseCategory, { useChangeStatus } from "./hooks/useEdit";
import useGetAllCourseCategory from "./hooks/useGetAllCat";
import { PAGE_LIMIT } from "../../constants";
import type { CourseCategory } from "./model/CourseCatModel";
import { ArrowUp, Edit, Stamp } from "lucide-react";
import SearchBox from "../users/utils/SearchBox";
import { debounce, } from "lodash";
import { FaPlus } from "react-icons/fa";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import ChangeCourseCategoryOrderModal from "./components/ChangeOrder";
import { CourseCategoryColumns } from "./columns";
import StatusModal from "./components/StatusModel";
import AddEditCourseCategoryModal from "./components/AddEditDept";

const CourseCategoryComp = () => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const createMutation = useCreateCourseCategory();
  const [statusFilter, setStatusFilter] = useState<'ENABLED' | "DISABLED" | ''>("");

  const { data, isLoading, isError } = useGetAllCourseCategory({
    search: debouncedSearch,
    page,
    status: statusFilter,
    limit,
  });
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };
  const editMutation = useEditCourseCategory();
  const [coursecategoryToChangeOrder, setCourseCategoryToChangeOrder] = useState<CourseCategory | null>(null);
  const [coursecategoryToEdit, setCourseCategoryToEdit] = useState<CourseCategory | null>(null);
  const [showModal, setShowModal] = useState(false);
  const coursecategory = data?.data ?? [];
  const statusMutation = useChangeStatus();
  const [statusData, setStatusData] = useState<CourseCategory | null>(null);
  const handleStatusChange = (row: CourseCategory) => {
    setStatusData(row);
    setShowStatusModal(true);
  };
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;
  const handleEdit = (coursecategory: CourseCategory) => { setCourseCategoryToEdit(coursecategory); setShowModal(true); };
  const [showOrderModal, setShowOrderModal] = useState(false);
  const handleAdd = (coursecategory?: CourseCategory) => {
    setCourseCategoryToEdit(coursecategory ?? null);
    setShowModal(true);
  };
  const tableActions: {
    icon: React.ReactNode | ((row: CourseCategory) => React.ReactNode);
    tooltip: string | ((row: CourseCategory) => string);
    onClick: (row: CourseCategory) => void;
    color?: string | ((row: CourseCategory) => string);
    condition?: (row: CourseCategory) => boolean;
  }[] = [
      {
        icon: <Edit className="w-4 h-4" />,
        tooltip: "Edit CourseCategory",
        onClick: handleEdit,
        color: "text-[#135EAB]"
      },
      {
        icon: <ArrowUp className="w-4 h-4" />,
        tooltip: "Change Order",
        onClick: (coursecategory) => {
          setCourseCategoryToChangeOrder(coursecategory);
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


        <div className="flex items-center gap-2">

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "ENABLED" | "DISABLED" | "");
              setPage(1);
            }}
            className="
      px-3 py-2
      border border-gray-300
      rounded-lg
      text-sm
      bg-white
      shadow-sm
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:border-blue-500
      transition
      cursor-pointer
    "
          >
            <option value="">All</option>
            <option value="ENABLE">Enabled</option>
            <option value="DISABLE">Disabled</option>
          </select>
        </div>
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
          data={coursecategory}
          columns={CourseCategoryColumns}
          actions={tableActions}
          loading={isLoading}
          emptyMessage={isError ? "Failed to load Course Categories" : "No Course Categories found"}
          total={total}
        />
      </div>
      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={handleLimitChange}
        total={total}
      />
      <ChangeCourseCategoryOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        coursecategory={coursecategoryToChangeOrder}
        maxOrder={coursecategory.length}
      />
      <AddEditCourseCategoryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={coursecategoryToEdit ?? undefined}
        isEdit={!!coursecategoryToEdit}
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

export default CourseCategoryComp
