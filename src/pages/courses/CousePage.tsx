import { useState } from "react";
import { ArrowUp, Edit, Edit3, Trash2, View } from "lucide-react";
import { FaTable, FaThLarge, FaPlus } from "react-icons/fa";
import { debounce } from "lodash";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "../courses/utils/SearchBox";

import DeleteTeamsModal from "./components/DeleteModel";
import AddEditCoursesWizardModal from "./components/Wizard";

import { PAGE_LIMIT } from "../../constants";
import useGetAll from "./hooks/useGetAllCourses";
import useCreateCourse from "./hooks/useCreateCourses";
import useEditCourses from "./hooks/useEditCourse";
import { useUploadCourseImage } from "./hooks/useUploadImage";
import { useUpdateImage } from "./hooks/useUpdateImage";
import { CoursesColumns } from "../courses/utils/columns";

import type { Courses } from "./model/CourseModel";
import CoursesCardView from "./CourseCardView";
import { useNavigate } from "react-router-dom";
import ChangeCourseOrderModal from "./components/ChangeOrder";

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
    limit: PAGE_LIMIT,
  });

  const createMutation = useCreateCourse();
  const editMutation = useEditCourses();
  const uploadImageMutation = useUploadCourseImage();
  const updateImageMutation = useUpdateImage();
  const navigate = useNavigate();

  const courses = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  const handleAdd = (course?: Courses) => {
    setCourseToEdit(course ?? null);
    setShowModal(true);
  };
  const handleEdit = (course: Courses) => { setCourseToEdit(course); setShowModal(true); };
  const handleDelete = (course: Courses) => { setCourseToEdit(course); setShowDeleteModal(true); };
  const handleView = (course: Courses) => {
    navigate(`/app/course-details/add/${course.id}`, { state: { course } });
  };
  const handlePreview = (course: Courses) => {
    navigate(`/app/course-details/${course.id}`, { state: { course } });
  };
  const handleEditDetails = (course: Courses) => {
    navigate(`/app/course-details/edit/${course.id}`, { state: { course } });
  };
  const [showOrderModal, setShowOrderModal] = useState(false);
const [courseToChangeOrder, setCourseToChangeOrder] = useState<Courses | null>(null);

  const tableActions: {
    icon: React.ReactNode | ((row: Courses) => React.ReactNode);
    tooltip: string | ((row: Courses) => string);
    onClick: (row: Courses) => void;
    color?: string;
    condition?: (row: Courses) => boolean;
  }[] = [
      {
        icon: <Edit className="w-4 h-4" />,
        tooltip: "Edit Course",
        onClick: handleEdit,
        color: "text-[#135EAB]"
      },
      {
        icon: <Trash2 className="w-4 h-4" />,
        tooltip: "Delete Course",
        onClick: handleDelete,
        color: "text-red-600"
      },
      {
        icon: <View className="w-4 h-4" />,
        tooltip: "Preview Course",
        onClick: handlePreview,
        color: "text-blue-500"
      },
      {
  icon: <ArrowUp className="w-4 h-4" />,
  tooltip: "Change Order",
  onClick: (course) => {
    setCourseToChangeOrder(course);
    setShowOrderModal(true);
  },
  color: "text-purple-600",
},
      {
        icon: <FaPlus className="w-4 h-4" />,
        tooltip: "Add Details",
        onClick: handleView,
        color: "text-green-600",
        condition: (course: Courses) => !course.hasDetails,
      },
      {
        icon: <Edit3 className="w-4 h-4" />,
        tooltip: "Edit Details",
        onClick: handleEditDetails,
        color: "text-green-600",
        condition: (course: Courses) => !!course.hasDetails,
      },
    ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2 ">
      <TitleBox title="Course Management" subtitle="Manage your courses" />

      {/* VIEW MODE + SEARCH + ADD */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${viewMode === "table"
              ? "bg-linear-to-r from-[#125DAA] to-[#1a7cd3] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <FaTable className="w-4 h-4" />
            <span>Table</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded ${viewMode === "card"
              ? "bg-linear-to-r from-[#125DAA] to-[#1a7cd3] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <FaThLarge className="w-4 h-4" />
            <span>Cards</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
          <SearchBox placeholder="Search Courses..." onSearch={handleSearch} />
          <button
            onClick={() => handleAdd()}
            disabled={createMutation.isPending}
            className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c]  flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

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
          <CoursesCardView
            courses={courses}
            isLoading={isLoading}
            isError={isError}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handlePreview}
          />
        )}
      </div>

      <Pagination page={page} hasNextPage={hasNextPage} totalPages={totalPages} onPageChange={setPage} />

      {/* MODALS */}
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
      <ChangeCourseOrderModal
  isOpen={showOrderModal}
  onClose={() => setShowOrderModal(false)}
  course={courseToChangeOrder}
  maxOrder={courses.length}
/>

    </div>
  );
};

export default CoursePage;
