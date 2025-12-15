import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import DeleteHolidaysModal from "./components/DeleteModel";
import type { Holidays } from "./model/HolidayModel";
import useGetHolidays from "./hooks/useGetAll";
import { useUpdateimage } from "./hooks/useUpdateImage";
import HolidaysCardView from "./components/HolidatyCardView";
import HolidayImageUploadForm from "./components/Wizard";

const HolidaysPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<Holidays | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError, } = useGetHolidays();
  const holidays = data?.data ?? [];

  const updateImageMutation = useUpdateimage();

  const handleAdd = () => setShowModal(true);
  
  const handleDelete = (item: Holidays) => {
    setHolidayToDelete(item);
    setShowDeleteModal(true);
  };

  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2 ">
      <TitleBox 
        title="Holidays Management" 
        subtitle="Upload and manage holiday images" 
      />

      <div className="flex justify-between items-center my-6">
       
        <button
          onClick={handleAdd}
          disabled={updateImageMutation.isPending}
          className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Holiday</span>
        </button>
      </div>

      <HolidaysCardView
        holidays={holidays}
        isLoading={isLoading}
        isError={isError}
        onDelete={handleDelete}
      />

      <DeleteHolidaysModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        holiday={holidayToDelete}
      />

      <HolidayImageUploadForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        updateImageMutation={updateImageMutation}
      />
    </div>
  );
};

export default HolidaysPage;