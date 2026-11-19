import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import decoration from "../../../../assets/decoration.webp";
import campusBuilding from "../../../../assets/infrastructure/campus-hero.webp";

const highlights = [
  { value: "7", label: "Ropani of campus land" },
  { value: "50,000+", label: "sq. ft. built-up area" },
  { value: "6", label: "Purpose-oriented blocks" },
  { value: "~90", label: "Rooms & spaces" },
];

const InfrastructureSection = () => {
  return (
    <section className="py-14 bg-white md:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl"
            >
              A Campus Built for{" "}
              <span className="relative text-[#474AFF] inline-block">
                Learning
                <img
                  src={decoration}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                />
              </span>
            </motion.h2>

            <p className="mb-8 leading-relaxed text-gray-600 md:text-lg">
              In the heart of Kathmandu, LBEF College brings classrooms,
              laboratories, libraries, student services and recreation together
              in one accessible location.
            </p>

            <div className="grid grid-cols-2 py-6 mb-8 border-y border-gray-200 gap-x-8 gap-y-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <p className="text-3xl font-bold text-[#474AFF] md:text-4xl">{item.value}</p>
                  <p className="mt-1 text-sm text-gray-600">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <Link
              to="/infrastructure"
              className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-[#474AFF] rounded-full shadow-md hover:bg-[#3538d6]"
            >
              Explore the Campus
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: single photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden aspect-[4/3] rounded-2xl group lg:aspect-auto"
          >
            <img
              src={campusBuilding}
              alt="LBEF College campus building"
              loading="lazy"
              className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
