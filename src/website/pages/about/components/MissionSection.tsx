import decoration from "../../../../assets/decoration.webp";
import top_mission from "../../../../assets/top_mission.webp";
import middle_mission from "../../../../assets/journey_background.webp";
import bottom_mission from "../../../../assets/mission/bottom_mission.webp";
import half_diamond from "../../../../assets/half_diamond.webp";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function MissionSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 md:py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our{" "}
              <span className="relative inline-block text-[#474AFF]">
                Missions
                <img
                  src={decoration}
                  alt=""
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                />
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Feature
              title="Vision"
              iconPath="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            >
              
              Our vision is to be the leading educational institution that creates an
              environment that fosters creativity, critical thinking, and innovation
              to produce leaders who are equipped to tackle future challenges.
            </Feature>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Feature
              title="Mission"
              iconPath="M13 10V3L4 14h7v7l9-11h-7z"
            >
              Our mission is to provide an engaging and supportive learning environment
              that empowers our students to <span className="font-bold">LEAD</span>  proactively with{" "}
              <span className="font-bold">
                BOLDNESS, EFFECTIVENESS, and FUTURISTIC
              </span>{" "}
              thinking.
            </Feature>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Feature
              title="Promise"
              iconPath="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            >
              Together with our top-notch faculty, we provide a nurturing environment
              to help students evolve into leaders who think boldly, make effective
              choices and are well-equipped with futuristic mindset and skills.
            </Feature>
          </motion.div>
        </motion.div>
      </div>

      {/* Right-side decorative diamonds */}
      <div
        className="
          hidden lg:block
          absolute right-0 top-1/2 -translate-y-1/2
          w-[42vw]  h-[85vh] [@media(min-width:1600px)]: max-w-[700px]
          overflow-hidden pointer-events-none
        "
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 100, rotate: 60 }}
          animate={inView ? { opacity: 1, scale: 1, x: 0, rotate: 45 } : { opacity: 0, scale: 0.7, x: 100, rotate: 60 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="absolute -rotate-45  top-[8%] right-[35%] [@media(min-width:1600px)]:top-[23%]"
        >
          <Diamond src={top_mission} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 100, rotate: 60 }}
          animate={inView ? { opacity: 1, scale: 1, x: 0, rotate: 45 } : { opacity: 0, scale: 0.7, x: 100, rotate: 60 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="absolute -rotate-45  top-[34%] right-[60%] [@media(min-width:1600px)]:top-[40%]"
        >
          <Diamond src={middle_mission} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 100, rotate: 60 }}
          animate={inView ? { opacity: 1, scale: 1, x: 0, rotate: 45 } : { opacity: 0, scale: 0.7, x: 100, rotate: 60 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="absolute -rotate-45 top-[60%] right-[35%] [@media(min-width:1600px)]:top-[58%]"
        >
          <Diamond src={bottom_mission} />
        </motion.div>

        <motion.img
          src={half_diamond}
          alt=""
          initial={{ opacity: 0, x: 100 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
          className="absolute right-0 top-1/2 -translate-y-1/2
                     w-40 md:w-[220px] lg:w-[280px] [@media(min-width:1600px)]:top-[52%]"
        />
      </div>
    </section>
  );
}

// Feature and Diamond components — unchanged
function Feature({
  title,
  iconPath,
  children,
}: {
  title: string;
  iconPath: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6 mb-12">
      <div className="shrink-0 w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
        <svg
          className="w-8 h-8 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Diamond({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={`
        w-[110px] h-[110px]
        md:w-[150px] md:h-[150px]
        lg:w-[190px] lg:h-[190px]
        rotate-45 overflow-hidden
        ${className}
      `}
    >
      <div className="w-full h-full -rotate-45 scale-150">
        <img src={src} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}