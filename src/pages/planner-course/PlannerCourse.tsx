import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";

import { plannercourseColumns } from "./utils/columns";

import { Edit,  Trash2,  } from "lucide-react";
import useCreatePlannerCourse from "./hooks/useCreateUser";
import useEditPlannerCourse from "./hooks/useEditUser";
import AddEditPlannerCourseModal from "./components/AddEditUserModel";
import DeletePlannerCourseModal from "./components/DeleteUserModel";
import useGetPlannerCourses from "./hooks/useGetAll";
import type { PlannerCourse } from "./model/PlannerCourse";


const PlannerCoursePage = () => {
    const [selectedPlannerCourse, setSelectedPlannerCourse] = useState<PlannerCourse | null>(null);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, isLoading, isError } = useGetPlannerCourses();

    const plannercourses = data?.data ?? [];
    const plannercourseMutation = useCreatePlannerCourse();
    const editMutation = useEditPlannerCourse();
   
    const handleAddPlannerCourse = () => {
        setSelectedPlannerCourse(null);
        setIsEditMode(false);
        setShowAddEditModal(true);
    };

    const handleEditPlannerCourse = (plannercourse: PlannerCourse) => {
        setSelectedPlannerCourse(plannercourse);
        setIsEditMode(true);
        setShowAddEditModal(true);
    };

    const handleDeletePlannerCourse = (plannercourse: PlannerCourse) => {
        setSelectedPlannerCourse(plannercourse);
        setShowDeleteModal(true);
    };

    const tableActions = [
        {
            icon: <Edit className="w-5 h-5" />,
            tooltip: "Edit Course",
            onClick: handleEditPlannerCourse,
            color: "text-blue-600 hover:bg-blue-600 hover:text-white"
        },
      
        {
            icon: <Trash2 className="w-5 h-5" />,
            tooltip: "Delete Course",
            onClick: handleDeletePlannerCourse,
            color: "text-red-600 hover:bg-red-600 hover:text-white"
        },
    ];


    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
            <TitleBox title="Planner Course" subtitle="Manage application courses" />

            <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4 my-6">
                <button
                    onClick={handleAddPlannerCourse}
                    className="px-5 py-2.5 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] flex items-center space-x-2 shadow hover:shadow-md transition-all duration-200 font-medium w-full md:w-auto justify-center"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Course</span>
                </button>
            </div>

            <EnhancedTable
                data={plannercourses}
                columns={plannercourseColumns}
                actions={tableActions}
                loading={isLoading}
                emptyMessage={isError ? "Failed to load courses" : "No plannercourses found"}
                total={plannercourses.length}
            />


            <AddEditPlannerCourseModal
                isOpen={showAddEditModal}
                onClose={() => setShowAddEditModal(false)}
                plannercourse={selectedPlannerCourse ?? undefined}
                isEdit={isEditMode}
                mutation={plannercourseMutation}
                editMutation={editMutation}
            />

           

            <DeletePlannerCourseModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                plannercourse={selectedPlannerCourse}

            />

         
        </div>
    );
};

export default PlannerCoursePage;
