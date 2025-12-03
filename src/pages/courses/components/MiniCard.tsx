import { FaUser, FaBookmark } from "react-icons/fa";

interface MiniCardProps {
  title: string;
  credits: number;
  instructor: string;
  semester: string;
  enrolled: number;
  capacity: number;
  status: string;
  color?: string;
}

const CourseMiniCard = ({
  title,
  credits,
  instructor,
  semester,
  enrolled,
  capacity,
  status,
  color = "#3B82F6"
}: MiniCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    }
  };

  return (
    <div className="rounded-xl overflow-hidden shadow bg-white dark:bg-slate-800">
      
      {/* HEADER */}
      <div
        className="h-24 flex items-center px-4 text-white font-semibold text-lg"
        style={{ backgroundColor: color }}
      >
        {title}
      </div>

      {/* BODY */}
      <div className="p-4 space-y-3">

        {/* Credits */}
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
          <FaBookmark className="w-4 h-4 mr-2 text-slate-400" />
          {credits} Credits
        </div>

        {/* Instructor */}
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
          <FaUser className="w-4 h-4 mr-2 text-slate-400" />
          {instructor}
        </div>

        {/* Semester */}
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
          <FaBookmark className="w-4 h-4 mr-2 text-slate-400" />
          {semester}
        </div>

        {/* Enrollment Progress */}
        <div className="text-sm text-slate-600 dark:text-slate-300">
          <div className="flex justify-between">
            <span>Enrollment</span>
            <span>{enrolled}/{capacity}</span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(enrolled / capacity) * 100}%` }}
            />
          </div>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

    </div>
  );
};

export default CourseMiniCard;
