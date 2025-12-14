import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { FaTable, FaThLarge, FaPlus } from "react-icons/fa";
import { debounce } from "lodash";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "./utils/SearchBox";

import DeleteTeamsModal from "./components/DeleteModel";
import AddEditCoursesWizardModal from "./components/Wizard";

import { PAGE_LIMIT } from "../../constants";
import useGetAll from "./hooks/useGetAllCourses";
import useCreateCourse from "./hooks/useCreateCourses";
import useEditCourses from "./hooks/useEditCourse";
import { useUploadCourseImage } from "./hooks/useUploadImage";
import { useUpdateImage } from "./hooks/useUpdateImage";
import { CoursesColumns } from "./utils/columns";

import type { Courses } from "./model/CourseModel";

const CoursePage = () => {
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [courseToEdit, setCourseToEdit] = useState<Courses | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useGetAll({
    search: debouncedSearch,
    page,
    limit: PAGE_LIMIT
  });

  const createMutation = useCreateCourse();
  const editMutation = useEditCourses();
  const uploadImageMutation = useUploadCourseImage();
  const updateImageMutation = useUpdateImage();

  const courses = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handleAdd = () => { setCourseToEdit(null); setShowModal(true); };
  const handleEdit = (course: Courses) => { setCourseToEdit(course); setShowModal(true); };
  const handleDelete = (course: Courses) => { setCourseToEdit(course); setShowDeleteModal(true); };

  const tableActions = [
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: "Edit Course",
      onClick: handleEdit,
      color: "text-[#135EAB] hover:bg-[#135EAB] hover:text-white"
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      tooltip: "Delete Course",
      onClick: handleDelete,
      color: "text-red-600 hover:bg-red-600 hover:text-white"
    },
  ];

  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Course Management" subtitle="Manage your courses" />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${
              viewMode === "table"
                ? "bg-linear-to-r from-[#125DAA] to-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Table</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${
              viewMode === "card"
                ? "bg-linear-to-r from-[#125DAA] to-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaThLarge className="w-4 h-4" />
            <span>Cards</span>
          </button>
        </div>

        {/* Search + Add */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
          <SearchBox placeholder="Search Courses..." onSearch={handleSearch} />

          <button
            onClick={handleAdd}
            disabled={createMutation.isPending}
            className="px-4 py-2 bg-[#135EAB] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {viewMode === "table" ? (
          <EnhancedTable
            data={courses}
            columns={CoursesColumns}
            actions={tableActions}
            loading={isLoading}
            emptyMessage={isError ? "Failed to load Courses" : "No Courses found"}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Add Card view rendering here if needed */}
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination page={page} hasNextPage={hasNextPage} totalPages={totalPages} onPageChange={setPage} />

      {/* Modals */}
      <DeleteTeamsModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        course={courseToEdit}
      />
      <AddEditCoursesWizardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        courseToEdit={courseToEdit}
        createMutation={createMutation}
        editMutation={editMutation}
        uploadImageMutation={uploadImageMutation}
        updateImageMutation={updateImageMutation}
      />
    </div>
  );
};

export default CoursePage;
