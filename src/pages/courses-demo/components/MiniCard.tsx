import { FaUser, FaBookmark, FaTimes } from "react-icons/fa";

interface MiniCardProps {
  title: string;
  credits: string;
  semester: string;
  category: string;
  duration: string;
  image: string;
  status: string;
  onView?: () => void;
}

const CourseMiniCard = ({
  title,
  credits,
  semester,
  category,
  duration,
  image,
  status,
  onView,
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
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow border border-[#002B6B8F] dark:border-slate-700 p-4 hover:shadow-lg transition-all w-full h-full flex flex-col">
      {/* IMAGE */}
      <div
        className="h-40 w-full rounded-xl relative overflow-hidden shrink-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-3 left-3 bg-[#002B6B] text-white px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap">
          {category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 mt-3 overflow-hidden">
        <h3 className="font-semibold text-[15px] text-gray-800 dark:text-white leading-tight line-clamp-2 mb-2">
          {title}
        </h3>

        {/* METADATA */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-[13px]">
            <FaBookmark className="text-blue-600 dark:text-blue-400" size={12} />
            <span>{credits} Credits</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-[13px]">
            <FaUser className="text-blue-600 dark:text-blue-400" size={12} />
            <span>{semester}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-[13px]">
            <FaTimes className="text-blue-600 dark:text-blue-400" size={12} />
            <span>{duration}</span>
          </div>

          <div className={`px-2 py-1 rounded-full text-[11px] font-medium ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>

        {/* LEARN MORE BUTTON */}
        <div className="mt-auto">
          <button
            onClick={onView}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseMiniCard;
