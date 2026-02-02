import { Calendar, Clock } from "lucide-react";
import { parseDate } from "../../../../utils/ParseDate";
import type { Intakes } from "../../../../pages/intake-calender/model/IntakeModel";

interface IntakeCardProps {
  title: string;
  duration: string;
  date: string;
  admissionStatus: string;
  intakeData: Intakes;
}

// Map intake sessions to background colors
const intakeColors: Record<string, string> = {
  Spring: "from-green-400 to-green-600",
  Summer: "from-yellow-400 to-orange-500",
  Fall: "from-orange-500 to-red-600",
  Autumn: "from-orange-500 to-red-600",
  Winter: "from-blue-400 to-blue-600",
};

const IntakeCard = ({
  title,
  duration,
  date,
  admissionStatus,
  intakeData,
}: IntakeCardProps) => {
  const isOpen = admissionStatus === "OPEN";
  const parsedDate = parseDate(date);

  const bgGradient =
    intakeColors[intakeData?.intake!.split(" ")[0]] || "from-gray-500 to-gray-700";

  return (
    <div className="group relative w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200">
      {/* Card background */}
      <div className={`relative h-48 bg-linear-to-br ${bgGradient}`}>
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

       

        <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
          <div className="flex justify-end items-end">
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                isOpen
                  ? "bg-blue-500 text-green-300 border border-green-500/30"
                  : "bg-red-500 text-red-300 border border-red-500/30"
              }`}
            >
              {admissionStatus}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white leading-tight line-clamp-2">
              {title}
            </h2>

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
              <Clock size={12} />
              <span className="text-xs font-medium">{duration}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl mt-2 p-2 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="text-white/90" size={16} />
                <div>
                  <p className="text-xs text-white/70">Last Date</p>
                  <p className="text-white text-sm font-semibold">{parsedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeCard;
