import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import { Edit, Trash2, Plus } from "lucide-react";
import { FaTable, FaThLarge } from "react-icons/fa";

import { PAGE_LIMIT } from "../../constants";

// -------- Fee Year --------
import useGetFeeYearsPagination from "./hooks/year/usePagination";
import type { FeeYear } from "./model/PlannerModel";


import type { FeePlanner } from "./model/PlannerModel";
import useGetFeePlannersPagination from "./hooks/useGerAkk";
import AddEditFeeYearModal from "./components/fee-year/addEdit";
import CreateEditPlannerModal from "./components/CreateMultiple";
import DeleteGalleryTypeModal from "./components/fee-year/addDelete";
import useCreateFeeYear from "./hooks/year/useCreatePlannerYear";
import DeletePlannerFee from "./components/DeletePlanner";
import useUpdateFeeYear from "./hooks/year/useUpdateAcademicYear";

const FeePlannersPage = () => {
  const [viewMode, setViewMode] = useState<"year" | "planner">("year");

  // ---------- Fee Year ----------
  const [yearPage, setYearPage] = useState(1);
  const [showYearModal, setShowYearModal] = useState(false);
  const [yearToEdit, setYearToEdit] = useState<FeeYear | null>(null);
  const [yearToDelete, setYearToDelete] = useState<FeeYear | null>(null);

  const { data: yearData, isLoading: yearLoading } =
    useGetFeeYearsPagination({
      page: yearPage,
      limit: PAGE_LIMIT,
    });

  const years = yearData?.data ?? [];
  const yearPagination = yearData?.pagination;

  // ---------- Fee Planner ----------
  const [plannerPage, setPlannerPage] = useState(1);
  const [showPlannerModal, setShowPlannerModal] = useState(false);
  const [plannerToEdit, setPlannerToEdit] = useState<FeePlanner | null>(null);
  const [plannerToDelete, setPlannerToDelete] = useState<FeePlanner | null>(null);
  const addMutation = useCreateFeeYear();
  const editMutation = useUpdateFeeYear();

  const { data: plannerData, isLoading: plannerLoading } =
    useGetFeePlannersPagination({
      page: plannerPage,
      limit: PAGE_LIMIT,
    });

  const planners = plannerData?.data ?? [];
  const plannerPagination = plannerData?.pagination;
  console.log("planners", planners);

  const yearColumns = [
    { label: "Year", accessor: "year" },
    { label: "Session", accessor: "session" },
  ];

  const plannerColumns = [
   
    { label: "Semester", accessor: "semester" },
    { label: "Course", accessor: "course" },

  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox
        title="Fee Planner Management"
        subtitle="Manage fee years and planners"
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
            <FaTable /> Fee Years
          </button>

          <button
            onClick={() => setViewMode("planner")}
            className={`px-4 py-2 flex items-center gap-1 rounded transition ${viewMode === "planner"
                ? "bg-linear-to-r from-[#125DAA] to-[#1a7cd3] text-white"
                : "bg-gray-100 dark:bg-gray-800"
              }`}
          >
            <FaThLarge /> Fee Planners
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
          Add {viewMode === "year" ? "Fee Year" : "Planner"}
        </button>
      </div>

      {/* ---------------- Content ---------------- */}
      {viewMode === "year" ? (
        <>
          <EnhancedTable
            data={years}
            columns={yearColumns}
            loading={yearLoading}
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
          />
        </>
      ) : (
        <>
          <EnhancedTable
            data={planners}
            columns={plannerColumns}
            loading={plannerLoading}
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
          />
        </>
      )}

      {/* ---------------- Modals ---------------- */}
      <AddEditFeeYearModal
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
      <DeletePlannerFee
        isOpen={!!plannerToDelete}
        onClose={() => setPlannerToDelete(null)}
        type={plannerToDelete}
      />
    </div>
  );
};

export default FeePlannersPage;
