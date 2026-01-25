// CourseMiniCard.tsx
import { FaUser, FaBookmark, FaClock } from "react-icons/fa";
import headerBg from "../../assets/mountain.webp";

interface MiniCardProps {
  title?: string;
  credits?: number;
  instructor?: string;
  semester?: string;
  enrolled?: number;
  capacity?: number;
  status?: string;

  duration?: string;
}

const CourseMiniCard = ({
  title,
  credits,
  instructor,
  semester,
  enrolled,
  capacity,
  status,
  duration,
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
    <div className="
      bg-white 
      dark:bg-slate-800
      rounded-2xl 
      shadow 
      border border-[#002B6B8F] 
      dark:border-slate-700
      p-4
      hover:shadow-lg 
      transition-all
      w-full
      h-full
      flex flex-col
    ">
      {/* IMAGE */}
      <div
        className="
          h-52 
          w-full 
          rounded-xl 
          relative 
          overflow-hidden
          shrink-0
        "
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* OVERLAY BADGE */}
        <div className="
          absolute 
          bottom-3 
          left-3 
          bg-[#002B6B] 
          text-white 
          px-3 
          py-1 
          rounded-md 
          text-xs 
          font-semibold
          whitespace-nowrap
        ">
          Artificial Intelligence
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 mt-3 overflow-hidden">
        {/* TITLE */}
        <h3 className="
          font-semibold 
          text-[15px] 
          text-gray-800 
          dark:text-white
          leading-tight
          line-clamp-2
          mb-2
        ">
          {title}
        </h3>

        {/* METADATA */}
        <div className="flex flex-wrap gap-2 mb-3">
          {credits && credits ? (

            <div className="
            flex 
            items-center 
            gap-1 
            text-gray-600 
            dark:text-gray-300
            text-[13px]
          ">
              <FaBookmark className="text-blue-600 dark:text-blue-400" size={12} />
              <span>{credits} Credits</span>
            </div>
          ) : ""}
          {duration && duration ? (
            <div className="
            flex 
            items-center 
            gap-1 
            text-gray-600 
            dark:text-gray-300
            text-[13px]
          ">
              <FaClock className="text-blue-600 dark:text-blue-400" size={12} />
              <span>{duration}</span>
            </div>
          ) : ""}
          {semester && semester ? (
            <div className="
            flex 
            items-center 
            gap-1 
            text-gray-600 
            dark:text-gray-300
            text-[13px]
          ">
              <FaUser className="text-blue-600 dark:text-blue-400" size={12} />
              <span>{semester}</span>
            </div>
          ) : ""}
          {status && status ? (
            <div className={`
            px-2 
            py-1 
            rounded-full 
            text-[11px] 
            font-medium
            ${getStatusColor()}
          `}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          ) : ""}
        </div>

        {instructor && enrolled && capacity && (
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Instructor: <span className="font-normal">{instructor}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              Enrollment: <span className="font-normal">{enrolled}/{capacity}</span>
            </p>
          </div>
        )}

        {/* BOTTOM ACTION */}
        <div className="mt-auto">
          <button

            className="
              bg-blue-600 
              hover:bg-blue-700 
              dark:bg-blue-700
              dark:hover:bg-blue-600
              text-white 
              w-full
              py-2.5
              rounded-xl 
              text-sm
              font-medium 
              flex items-center justify-center gap-2
              transition-colors
            "
            aria-label="Learn More"
          >
            Learn More →
          </button>
        </div>
      </div>
    </div >
  );
};

export default CourseMiniCard;