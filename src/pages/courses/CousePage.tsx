import { useState } from "react";
import { ArrowUp, Copy, Edit, Edit3, Power, Trash2, View } from "lucide-react";
import { FaTable, FaThLarge, FaPlus } from "react-icons/fa";
import { debounce } from "lodash";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "../courses/utils/SearchBox";

import DeleteTeamsModal from "./components/DeleteModel";
import AddEditCoursesWizardModal from "./components/Wizard";

import { PAGE_LIMIT } from "../../constants";
import { CoursesColumns } from "../courses/utils/columns";

import type { Courses } from "./model/CourseModel";
import CoursesCardView from "./CourseCardView";
import { useNavigate } from "react-router-dom";
import ChangeCourseOrderModal from "./components/ChangeOrder";
import useGetAll from "./hooks/useGetAllCourses";
import useCreateCourse from "./hooks/useCreateCourses";
import useEditCourses from "./hooks/useEditCourse";
import { useUploadCourseImage } from "./hooks/useUploadImage";
import { useUpdateImage } from "./hooks/useUpdateImage";
import useCopyCourse from "./hooks/useCopyCourse";
import CopyCourseModal from "./components/CopyCourse";
import CourseCategoryComp from "../course-category/CourseCategoryComp";
import useGetCourseCategoryNameAll from "../course-category/hooks/useGetCatName";
import useToggleCourseStatus from "./hooks/useToggleStatus";
import ToggleStatusModal from "./components/ToggleStatus";
import ShiftComp from "../shift/ShiftComp";
import ClassTimingComp from "../class-timing/ClassTimingComp";

const CoursePage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [courseToEdit, setCourseToEdit] = useState<Courses | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "card" | "category" | "shift" | "timing">("table");

  // ── Copy ──────────────────────────────────────────────────────────────────
  const copyMutation = useCopyCourse();
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [courseToCopy, setCourseToCopy] = useState<Courses | null>(null);

  const handleCopy = (course: Courses) => {
    setCourseToCopy(course);
    setShowCopyModal(true);
  };
  const confirmCopy = () => {
    if (!courseToCopy) return;
    copyMutation.mutate(courseToCopy.id);
    setShowCopyModal(false);
  };

  // ── Toggle status ─────────────────────────────────────────────────────────
  const toggleStatusMutation = useToggleCourseStatus();
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [courseToToggle, setCourseToToggle] = useState<Courses | null>(null);

  const handleToggleStatus = (course: Courses) => {
    setCourseToToggle(course);
    setShowToggleModal(true);
  };
const confirmToggle = () => {
  if (!courseToToggle || courseToToggle.id === undefined) return;
  toggleStatusMutation.mutate(Number(courseToToggle.id), {
    onSuccess: () => {
      setShowToggleModal(false);
      setCourseToToggle(null);
    },
  });
};
  // ── Search ────────────────────────────────────────────────────────────────
  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const [selectedTypeId, setSelectedTypeId] = useState<number | undefined>(undefined);

  // ── Data ──────────────────────────────────────────────────────────────────
  const { data, isLoading, isError } = useGetAll({
    search: debouncedSearch,
    page,
    limit,
    categoryId: selectedTypeId,
  });

  const createMutation = useCreateCourse();
  const editMutation = useEditCourses();
  const uploadImageMutation = useUploadCourseImage();
  const updateImageMutation = useUpdateImage();
  const navigate = useNavigate();

  const courses = data?.data ?? [];
  const totalItems = data?.pagination?.total ?? 0;
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAdd = (course?: Courses) => { setCourseToEdit(course ?? null); setShowModal(true); };
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

  // ── Order ─────────────────────────────────────────────────────────────────
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [courseToChangeOrder, setCourseToChangeOrder] = useState<Courses | null>(null);

  // ── Table actions ─────────────────────────────────────────────────────────
  const tableActions: {
    icon: React.ReactNode | ((row: Courses) => React.ReactNode);
    tooltip: string | ((row: Courses) => string);
    onClick: (row: Courses) => void;
    color?: string | ((row: Courses) => string); // 👈 allow dynamic color
    condition?: (row: Courses) => boolean;
  }[] = [
    {
      icon: <Edit className="w-4 h-4" />,
      tooltip: "Edit Course",
      onClick: handleEdit,
      color: "text-[#135EAB]",
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      tooltip: "Delete Course",
      onClick: handleDelete,
      color: "text-red-600",
    },
    {
      icon: <View className="w-4 h-4" />,
      tooltip: "Preview Course",
      onClick: handlePreview,
      color: "text-blue-500",
    },
    {
      icon: <Copy className="w-4 h-4" />,
      tooltip: "Duplicate Course",
      onClick: handleCopy,
      color: "text-indigo-600",
    },
    {
      // Icon color changes based on current status
      icon: () => (
        <Power className="w-4 h-4" />
      ),
      tooltip: (course: Courses) =>
        course.status === "ENABLED" ? "Disable Course" : "Enable Course",
      onClick: handleToggleStatus,
      // Dynamic color: green when enabled (click = disable), red when disabled (click = enable)
      color: (course: Courses) =>
        course.status === "ENABLED" ? "text-green-500" : "text-red-400",
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

  const { data: typesDataAll } = useGetCourseCategoryNameAll();
  const galleryTypesAll = typesDataAll?.data ?? [];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Course Management" subtitle="Manage your courses" />

      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        {/* View toggle buttons */}
        <div className="flex gap-2">
          {(["category", "shift", "timing", "table", "card"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 flex items-center space-x-1 transition-colors rounded capitalize ${
                viewMode === mode
                  ? "bg-[#1a7cd3] text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {mode === "card" ? (
                <FaThLarge className="w-4 h-4" />
              ) : (
                <FaTable className="w-4 h-4" />
              )}
              <span>{mode === "timing" ? "Class Timing" : mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
            </button>
          ))}
        </div>

        {/* Search / filter / add — hidden in category and shift views */}
        {viewMode !== "category" && viewMode !== "shift" && viewMode !== "timing" && (
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
            <SearchBox placeholder="Search Courses..." onSearch={handleSearch} />
            <select
              className="w-full md:w-auto px-4 py-3 pr-10 text-gray-900 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 cursor-pointer appearance-none transition duration-150 ease-in-out"
              value={selectedTypeId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedTypeId(val ? Number(val) : undefined);
                setPage(1);
              }}
            >
              <option value="">All Types</option>
              {galleryTypesAll.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleAdd()}
              disabled={createMutation.isPending}
              className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
            >
              <FaPlus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        )}
      </div>

      {/* Category view */}
      {viewMode === "category" && <CourseCategoryComp />}

      {/* Shift view */}
      {viewMode === "shift" && <ShiftComp />}

      {/* Class timing view */}
      {viewMode === "timing" && <ClassTimingComp />}

      {/* Table / Card view */}
      {viewMode !== "category" && viewMode !== "shift" && viewMode !== "timing" && (
        <div>
          {viewMode === "table" ? (
            <EnhancedTable
              data={courses}
              columns={CoursesColumns}
              actions={tableActions}
              loading={isLoading}
              emptyMessage={isError ? "Failed to load Courses" : "No Courses found"}
              total={totalItems}
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
          <Pagination
            page={page}
            hasNextPage={hasNextPage}
            totalPages={totalPages}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={handleLimitChange}
            total={totalItems}
          />
        </div>
      )}

      {/* ── Modals ── */}
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
        maxOrder={totalItems}
      />

      <CopyCourseModal
        isOpen={showCopyModal}
        onClose={() => setShowCopyModal(false)}
        course={courseToCopy}
        onConfirm={confirmCopy}
        loading={copyMutation.isPending}
      />

      {/* 👇 Toggle status modal */}
      <ToggleStatusModal
        isOpen={showToggleModal}
        onClose={() => { setShowToggleModal(false); setCourseToToggle(null); }}
        course={courseToToggle}
        onConfirm={confirmToggle}
        loading={toggleStatusMutation.isPending}
      />
    </div>
  );
};

export default CoursePage;