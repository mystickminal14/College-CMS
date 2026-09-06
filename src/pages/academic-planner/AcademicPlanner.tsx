import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import { Edit, Trash2, Plus } from "lucide-react";
import { FaTable, FaThLarge } from "react-icons/fa";

import { IMAGE_URL, PAGE_LIMIT } from "../../constants";

// -------- Academic Year --------
import useGetAcademicYearsPagination from "./hooks/year/usePagination";
import type { AcademicYear } from "./model/PlannerModel";


import type { AcademicPlanner } from "./model/PlannerModel";
import useGetAcademicPlannersPagination from "./hooks/useGerAkk";
import AddEditAcademicYearModal from "./components/academic-year/addEdit";
import CreateEditPlannerModal from "./components/CreateMultiple";
import DeleteGalleryTypeModal from "./components/academic-year/addDelete";
import useCreateAcademicYear from "./hooks/year/useCreatePlannerYear";
import useUpdateAcademicYear from "./hooks/year/useUpdateAcademicYear";
import DeletePlannerAcademic from "./components/DeletePlanner";

const PlannersPage = () => {
  const [viewMode, setViewMode] = useState<"year" | "planner">("year");

  // ---------- Academic Year ----------
  const [yearPage, setYearPage] = useState(1);
  const [yearLimit, setYearLimit] = useState(PAGE_LIMIT);
  const [showYearModal, setShowYearModal] = useState(false);
  const [yearToEdit, setYearToEdit] = useState<AcademicYear | null>(null);
  const [yearToDelete, setYearToDelete] = useState<AcademicYear | null>(null);

  const { data: yearData, isLoading: yearLoading } =
    useGetAcademicYearsPagination({
      page: yearPage,
      limit: yearLimit,
    });

  const years = yearData?.data ?? [];
  const yearPagination = yearData?.pagination;

  const handleYearLimitChange = (newLimit: number) => {
    setYearLimit(newLimit);
    setYearPage(1);
  };

  // ---------- Academic Planner ----------
  const [plannerPage, setPlannerPage] = useState(1);
  const [plannerLimit, setPlannerLimit] = useState(PAGE_LIMIT);
  const [showPlannerModal, setShowPlannerModal] = useState(false);
  const [plannerToEdit, setPlannerToEdit] = useState<AcademicPlanner | null>(null);
  const [plannerToDelete, setPlannerToDelete] = useState<AcademicPlanner | null>(null);
  const addMutation = useCreateAcademicYear();
  const editMutation = useUpdateAcademicYear();

  const { data: plannerData, isLoading: plannerLoading } =
    useGetAcademicPlannersPagination({
      page: plannerPage,
      limit: plannerLimit,
    });

  const planners = plannerData?.data ?? [];
  const plannerPagination = plannerData?.pagination;

  const handlePlannerLimitChange = (newLimit: number) => {
    setPlannerLimit(newLimit);
    setPlannerPage(1);
  };

  const yearColumns = [
    { label: "Year", accessor: "year" },
    { label: "Session", accessor: "session" },
  ];

  const plannerColumns = [
    { label: "Session", accessor: "academicYear" , render: (row: AcademicPlanner) => row.academicYear?.session ?? "-",},
    { label: "Year", accessor: "academicYear" , render: (row: AcademicPlanner) => row.academicYear?.year ?? "-",},

    {
      label: "Course", accessor: "plannerCourse", render: (row: AcademicPlanner) => row.plannerCourse?.name ?? "-",
    },
    { label: "Semester", accessor: "semester" },
    { label: "Intake", accessor: "intake" },
    {
      label: "File",
      accessor: "file",
      render: (row: AcademicPlanner) => {
        const handleOpenFile = () => {
          if (row.file) {
            window.open(IMAGE_URL + row.file, "_blank");
          } else {
            alert("No file available");
          }
        };
        return (
          <button
            onClick={handleOpenFile}
            className="px-3 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition"
          >
            Open File
          </button>
        );
      },
    },

  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox
        title="Academic Planner Management"
        subtitle="Manage academic years and planners"
      />

      {/* ---------------- Tabs ---------------- */}
      <div className="flex justify-between items-center my-6">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("year")}
            className={`px-4 py-2 flex items-center gap-1 rounded transition ${viewMode === "year"
              ? "bg-linear-to-r from-[#125DAA] to-[#1a7cd3] text-white"
              : "bg-gray-100 dark:bg-gray-800"
              }`}
          >
            <FaTable /> Academic Years
          </button>

          <button
            onClick={() => setViewMode("planner")}
            className={`px-4 py-2 flex items-center gap-1 rounded transition ${viewMode === "planner"
              ? "bg-linear-to-r from-[#125DAA] to-[#1a7cd3] text-white"
              : "bg-gray-100 dark:bg-gray-800"
              }`}
          >
            <FaThLarge /> Academic Planners
          </button>
        </div>

        <button
          onClick={() => {
            if (viewMode === "year") {
              setYearToEdit(null);
              setShowYearModal(true);
            } else {
              setPlannerToEdit(null);
              setShowPlannerModal(true);
            }
          }}
          className="px-5 py-2 bg-[#1a7cd3] text-white rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add {viewMode === "year" ? "Academic Year" : "Planner"}
        </button>
      </div>

      {/* ---------------- Content ---------------- */}
      {viewMode === "year" ? (
        <>
          <EnhancedTable
            data={years}
            columns={yearColumns}
            loading={yearLoading}
            total={yearPagination?.total ?? 0}
            actions={[
              {
                icon: <Edit />,
                tooltip: "Edit",
                onClick: (row) => {
                  setYearToEdit(row);
                  setShowYearModal(true);
                },
              },
              {
                icon: <Trash2 />,
                tooltip: "Delete",
                onClick: (row) => setYearToDelete(row),
              },
            ]}
          />

          <Pagination
            page={yearPage}
            totalPages={yearPagination?.totalPages ?? 1}
            hasNextPage={yearPagination?.hasNextPage ?? false}
            onPageChange={setYearPage}
            limit={yearLimit}
            onLimitChange={handleYearLimitChange}
            total={yearPagination?.total ?? 0}
          />
        </>
      ) : (
        <>
          <EnhancedTable
            data={planners}
            columns={plannerColumns}
            loading={plannerLoading}
            total={plannerPagination?.total ?? 0}
            actions={[
              {
                icon: <Edit />,
                tooltip: "Edit",
                onClick: (row) => {
                  setPlannerToEdit(row);
                  setShowPlannerModal(true);
                },
              },
              {
                icon: <Trash2 />,
                tooltip: "Delete",
                onClick: (row) => setPlannerToDelete(row),
              },
            ]}
          />

          <Pagination
            page={plannerPage}
            totalPages={plannerPagination?.totalPages ?? 1}
            hasNextPage={plannerPagination?.hasNextPage ?? false}
            onPageChange={setPlannerPage}
            limit={plannerLimit}
            onLimitChange={handlePlannerLimitChange}
            total={plannerPagination?.total ?? 0}
          />
        </>
      )}

      {/* ---------------- Modals ---------------- */}
      <AddEditAcademicYearModal
        isOpen={showYearModal}
        onClose={() => setShowYearModal(false)}
        type={yearToEdit ?? undefined}
        isEdit={!!yearToEdit}
        mutation={addMutation}
        editMutation={editMutation}
      />

      <DeleteGalleryTypeModal
        isOpen={!!yearToDelete}
        onClose={() => setYearToDelete(null)}
        type={yearToDelete}
      />

      <CreateEditPlannerModal
        isOpen={showPlannerModal}
        onClose={() => setShowPlannerModal(false)}
        planner={plannerToEdit}
      />
      <DeletePlannerAcademic
        isOpen={!!plannerToDelete}
        onClose={() => setPlannerToDelete(null)}
        type={plannerToDelete}
      />
    </div>
  );
};

export default PlannersPage;
