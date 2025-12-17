import React from "react";
import { Trash2 } from "lucide-react";
import image from '../../../assets/intake.jpg'
import { parseDate } from "../../../utils/ParseDate";
import type { Intakes } from "../model/IntakeModel";

interface CardProps {
  title: string;
  duration: string;
  date: string;
  admissionStatus: string;
  onDelete: () => void;
  intakeData: Intakes;
}

const IntakeCard: React.FC<CardProps> = ({ 
  title, 
  duration, 
  date, 
  admissionStatus, 
  onDelete 
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300 relative group">
      {/* Delete Icon - Top Right Corner */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 z-10 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label={`Delete ${title}`}
        title="Delete intake"
      >
        <Trash2 size={18} />
      </button>

      {/* Image Container with Overlay */}
      <div className="h-48 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-0"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Status Badge on Image - RED for CLOSED */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            admissionStatus === "OPEN" 
              ? "bg-blue-500  text-white" 
              : "bg-red-500 text-white"  // Changed from gray-600 to red-500
          }`}>
            {admissionStatus}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{duration}</p>
        
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Admission Window:</p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            admissionStatus === "OPEN" 
              ? "bg-blue-500 text-white dark:bg-green-900 dark:text-green-200" 
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"  // Already has red for CLOSED
          }`}>
            {admissionStatus}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
          <span className="font-medium mr-1">Last Date:</span>
          <span>{parseDate(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default IntakeCard;