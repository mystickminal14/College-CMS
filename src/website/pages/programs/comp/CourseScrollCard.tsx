import { FaUser, FaBookmark, FaTimes } from "react-icons/fa";

interface MiniCardProps {
  title: string;
  credits: string;
  semester: string;
  category?: string;
  prefix?: string;
  duration: string;
  image: string;
  onView: () => void;
  isActive?: boolean; // Add this prop
}

const CourseMiniCard = ({
  title,
  credits,
  semester,
  category,
  prefix,
  duration,
  image,
  onView,
  isActive = false, // Default to false
}: MiniCardProps) => {
  return (
    <div
      className={`
        bg-white dark:bg-slate-800
        rounded-2xl
        shadow
        border border-[#002B6B8F] dark:border-slate-700
        p-4
        hover:shadow-lg
        transition-all duration-300
        w-full h-full
        flex flex-col
        ${isActive 
          ? 'ring-2 ring-blue-500 ring-opacity-50 scale-[1.02] shadow-lg' 
          : 'hover:scale-[1.01]'
        }
      `}
    >
      <div className="w-full">
        <div
          className={`
            w-full
            aspect-square
            rounded-xl
            relative
            overflow-hidden
            border border-slate-200 dark:border-slate-700
            transition-all duration-300
            ${isActive ? 'ring-1 ring-blue-400' : ''}
          `}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* CATEGORY BADGE */}
          {category && (
            <div
              className={`
                absolute
                bottom-2 left-2
                text-white
                px-2.5 py-1
                rounded-md
                text-[11px]
                font-semibold
                transition-all duration-300
                ${isActive ? 'bg-blue-600' : 'bg-[#002B6B]'}
              `}
            >
              {category}
            </div>
          )}
          
          {/* Active indicator dot */}
          {isActive && (
            <div className="absolute top-2 right-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 mt-3 overflow-hidden">
        {/* TITLE */}
        <h3
          className={`
            font-semibold
            text-[14px] sm:text-[15px]
            leading-tight
            line-clamp-2
            mb-2
            transition-colors duration-300
            ${isActive 
              ? 'text-blue-700 dark:text-blue-300' 
              : 'text-gray-800 dark:text-white'
            }
          `}
        >
          {prefix} {title}
        </h3>

        {/* META INFO */}
        <div className="flex flex-wrap gap-2 mb-4 text-[12px] sm:text-[13px]">
          <div 
            className={`
              flex items-center gap-1 
              transition-colors duration-300
              ${isActive 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-300'
              }
            `}
          >
            <FaBookmark size={12} />
            {credits} Credits
          </div>

          <div 
            className={`
              flex items-center gap-1 
              transition-colors duration-300
              ${isActive 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-300'
              }
            `}
          >
            <FaUser size={12} />
            {semester}
          </div>

          <div 
            className={`
              flex items-center gap-1 
              transition-colors duration-300
              ${isActive 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-300'
              }
            `}
          >
            <FaTimes size={12} />
            {duration}
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-auto">
          <button
            onClick={onView}
            className={`
              w-full
              py-2.5
              rounded-xl cursor-pointer
              text-white
              text-sm
              font-medium
              transition-all duration-300
              ${isActive 
                ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md' 
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
              }
            `}
          >
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseMiniCard;