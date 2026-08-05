import { motion, type Variants } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import type { ClassTiming } from "../../class-timing/model/ClassTimingModel";
import { formatTimeRange } from "../../class-timing/utils/format";

// Cards cycle through this palette so any timing an admin adds still gets a colour
const PALETTE = [
  { wrapper: "bg-blue-50 border-blue-100", icon: "bg-blue-100", glyph: "text-blue-600", time: "text-blue-700" },
  { wrapper: "bg-emerald-50 border-emerald-100", icon: "bg-emerald-100", glyph: "text-emerald-600", time: "text-emerald-700" },
  { wrapper: "bg-purple-50 border-purple-100", icon: "bg-purple-100", glyph: "text-purple-600", time: "text-purple-700" },
  { wrapper: "bg-amber-50 border-amber-100", icon: "bg-amber-100", glyph: "text-amber-600", time: "text-amber-700" },
];

interface Props {
  timings: ClassTiming[];
  /** LECTURE cards use a clock, TUTORIAL cards a book */
  variant: "LECTURE" | "TUTORIAL";
  itemVariants?: Variants;
}

/**
 * Renders the class timing / tutorial cards on the course detail page from the
 * ClassTiming records assigned to the course. Nothing is hardcoded here — a
 * course with no timings assigned renders nothing at all.
 */
const CourseTimingCards = ({ timings, variant, itemVariants }: Props) => {
  const matching = timings.filter((timing) => timing.kind === variant);

  if (matching.length === 0) return null;

  const Icon = variant === "LECTURE" ? Clock : BookOpen;

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4"
    >
      {matching.map((timing, index) => {
        const colors = PALETTE[index % PALETTE.length];
        const range = formatTimeRange(timing);
        const spanFull = matching.length === 1 ? "col-span-full" : "";

        return (
          <div
            key={timing.id ?? timing.name}
            className={`${spanFull} border rounded-lg p-3 ${colors.wrapper}`}
          >
            <div className="flex items-start gap-3">
              <div className={`${colors.icon} p-2 rounded-md`}>
                <Icon className={`w-4 h-4 ${colors.glyph}`} />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-800">
                  {timing.name}
                </p>

                {range && (
                  <p className={`text-xs font-medium ${colors.time}`}>{range}</p>
                )}

                {timing.days && (
                  <p className="text-[11px] text-gray-600">{timing.days}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default CourseTimingCards;
