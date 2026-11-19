import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useCountUp from "../hooks/useCountUp";

const stats = [
  { value: 7, suffix: "", label: "Ropani of land" },
  { value: 6, suffix: "", label: "Campus blocks" },
  { value: 50, suffix: "k+", label: "Sq. ft. built-up" },
  { value: 32, suffix: "", label: "Classrooms" },
  { value: 7, suffix: "", label: "Computer labs" },
];

const Stat = ({ value, suffix, label, active }: (typeof stats)[number] & { active: boolean }) => {
  const counted = useCountUp(value, active);
  return (
    <div className="px-4 py-6 text-center md:py-8 last:col-span-2 md:last:col-span-1">
      <div className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl tabular-nums">
        {counted}
        <span className="text-blue-600">{suffix}</span>
      </div>
      <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
    </div>
  );
};

/** Floating figures card that overlaps the bottom of the hero. */
const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative z-10 grid grid-cols-2 -mt-20 bg-white divide-gray-100 shadow-xl md:grid-cols-5 md:divide-x mb-20 md:mb-28 rounded-3xl ring-1 ring-black/5 shadow-gray-900/5"
    >
      {stats.map((stat) => (
        <Stat key={stat.label} {...stat} active={inView} />
      ))}
    </motion.div>
  );
};

export default StatsBar;
