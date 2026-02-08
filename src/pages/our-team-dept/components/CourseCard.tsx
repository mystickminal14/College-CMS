import { FaUser, FaBookmark, FaTimes } from "react-icons/fa";

interface MiniCardProps {
  title: string;
  credits: string;
  semester: string;
  category?: string;
  duration: string;
  image: string;
  onView: () => void;
}

const CourseMiniCard = ({
  title,
  credits,
  semester,
  category,
  duration,
  image,
  onView,
}: MiniCardProps) => {
  return (
    <div
      className="
        w-[280px] sm:w-[320px]  /* 280px on mobile, 340px above 500px */
        bg-white dark:bg-slate-800
        rounded-2xl shadow border border-[#002B6B8F] dark:border-slate-700
        p-4 hover:shadow-lg transition-all
        flex flex-col
      "
    >
      {/* IMAGE */}
      <div
        className="h-60 w-full rounded-xl relative overflow-hidden shrink-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {category && (
          <div className="
            absolute bottom-3 left-3
            bg-[#002B6B] text-white
            px-3 py-1 rounded-md
            text-xs font-semibold
          ">
            {category}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 mt-3">
        <h3 className="
          font-semibold text-[15px]
          text-gray-800 dark:text-white
          line-clamp-2 mb-2
        ">
          {title}
        </h3>

        {/* META */}
        <div className="flex flex-wrap gap-2 mb-4 text-[13px]">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <FaBookmark size={12} />
            {credits} Credits
          </div>

          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <FaUser size={12} />
            {semester}
          </div>

          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <FaTimes size={12} />
            {duration}
          </div>
        </div>

        {/* ACTION */}
        <button
          onClick={onView}
          className="
            mt-auto
            bg-blue-600 hover:bg-blue-700
            dark:bg-blue-700 dark:hover:bg-blue-600
            text-white
            py-2.5 rounded-xl
            text-sm font-medium
            transition-colors
          "
        >
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default CourseMiniCard;
