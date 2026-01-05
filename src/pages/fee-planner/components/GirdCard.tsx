import React from "react";
import { Edit, Trash2, Eye, Calendar } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import type { Planners } from "../model/PlannerModel";
import image from '../../../assets/pcpslogo.png'

interface CardViewProps {
  planners: Planners[];
  onEdit: (planner: Planners) => void;
  onDelete: (planner: Planners) => void;
  onAddMultiple: (planner: Planners) => void;
  onViewChildren: (planner: Planners) => void;
}

const CardView: React.FC<CardViewProps> = ({
  planners,
  onEdit,
  onDelete,
  onAddMultiple,
  onViewChildren,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {planners.map((planner) => (
        <div
          key={planner.id}
          className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4 flex flex-col justify-between transform hover:-translate-y-1"
        >
          {/* Image / Thumbnail */}
          <div className="flex justify-center mb-3">
            <img
              src={image} // Replace with actual image if available
              alt="Planner"
              className="h-20 w-auto object-contain rounded-full"
            />
          </div>

          {/* Planner Info */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
              <Calendar className="w-5 h-5 mr-1" />
              <span className="text-sm">{planner.session ?? "No Date"}</span>
            </div>



          </div>

          {/* Action Buttons */}
          <div className="flex justify-around mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => onViewChildren(planner)}
              className="text-green-600 cursor-pointer hover:bg-green-600 hover:text-white p-3 rounded-lg transition transform hover:scale-110"
              title="View / Add Children"
            >
              <Eye className="w-6 h-6" />
            </button>

            <button
              onClick={() => onEdit(planner)}
              className="text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white p-3 rounded-lg transition transform hover:scale-110"
              title="Edit Planner"
            >
              <Edit className="w-6 h-6" />
            </button>

            <button
              onClick={() => onAddMultiple(planner)}
              className="text-yellow-600 cursor-pointer hover:bg-yellow-600 hover:text-white p-3 rounded-lg transition transform hover:scale-110"
              title="Add Multiple Files"
            >
              <FaPlus className="w-6 h-6" />
            </button>

            <button
              onClick={() => onDelete(planner)}
              className="text-red-600 cursor-pointer hover:bg-red-600 hover:text-white p-3 rounded-lg transition transform hover:scale-110"
              title="Delete Planner"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
