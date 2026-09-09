import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Building2, LandPlot, LayoutGrid, Ruler } from "lucide-react";
import { campusStats } from "../data";

const icons = [
  <LandPlot className="w-7 h-7" />,
  <Ruler className="w-7 h-7" />,
  <Building2 className="w-7 h-7" />,
  <LayoutGrid className="w-7 h-7" />,
];

const CampusStats = () => {
  const [counts, setCounts] = useState(campusStats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated) return;
        setHasAnimated(true);

        const timers = campusStats.map((stat, index) => {
          const steps = 60;
          const increment = stat.value / steps;
          let current = 0;

          return setInterval(() => {
            current += increment;
            if (current >= stat.value) {
              current = stat.value;
              clearInterval(timers[index]);
            }
            setCounts((prev) => {
              const next = [...prev];
              next[index] = Math.floor(current);
              return next;
            });
          }, 2000 / steps);
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="mb-16 md:mb-20">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
        {campusStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: index * 0.1,
            }}
            className="flex flex-col items-center p-5 space-y-2 text-center border border-gray-200 shadow-lg bg-linear-to-br from-white to-gray-50 rounded-2xl"
          >
            <div className="text-blue-600">{icons[index]}</div>
            <div className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl tabular-nums">
              {stat.prefix}
              {counts[index].toLocaleString()}
              {stat.suffix}
            </div>
            <div className="text-xs leading-tight text-gray-600 sm:text-sm">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CampusStats;
