import React from "react";
import { Trash2, Calendar, Clock } from "lucide-react";
import image from '../../../assets/intake.webp'
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
  const isOpen = admissionStatus === "OPEN";
  const parsedDate = parseDate(date);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete();
  };

  return (
    <div className="group relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
      {/* Background Image Container */}
      <div className="relative h-68 bg-linear-to-br from-gray-900 to-gray-800">
        {/* Image Background */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
        />

        {/* Linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">

          {/* Top Section with Status and Delete */}
          <div className="flex justify-between items-start">


            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="p-2.5 bg-white/10 backdrop-blur-sm rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-4"
              aria-label="Delete intake"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Center Content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white leading-tight">
              {title}
            </h2>

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <Clock size={14} />
              <span className="text-sm font-medium">{duration}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-2 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="text-white/90" size={18} />
                <div>
                  <p className="text-xs text-white/70">Last Date</p>
                  <p className="text-white  text-sm font-semibold">{parsedDate}</p>
                </div>
              </div>

              <div className={`text-right ${isOpen ? 'text-green-300' : 'text-red-300'
                }`}>
                <p className="text-xs font-medium">
                  {isOpen ? ' Applications' : 'Applications'}
                </p>
                <p className="text-sm font-bold">{admissionStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeCard;