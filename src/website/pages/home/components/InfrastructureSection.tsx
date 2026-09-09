import { motion } from "framer-motion";
import { ArrowRight, Building2, LandPlot, LayoutGrid, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import decoration from "../../../../assets/decoration.webp";
import campusHero from "../../../../assets/infrastructure/campus-hero.webp";
import classroom from "../../../../assets/infrastructure/classroom-02.webp";
import seminarHall from "../../../../assets/infrastructure/seminar-hall-01.webp";
import lobby from "../../../../assets/infrastructure/reception-03.webp";

const highlights = [
  { icon: <LandPlot className="w-5 h-5" />, value: "7 Ropani", label: "Campus land" },
  { icon: <Ruler className="w-5 h-5" />, value: "50,000+", label: "sq. ft. built-up" },
  { icon: <Building2 className="w-5 h-5" />, value: "6", label: "Campus blocks" },
  { icon: <LayoutGrid className="w-5 h-5" />, value: "~90", label: "Rooms & spaces" },
];

// The last tile spans both columns; see the collage grid below.
const tiles = [
  { src: classroom, alt: "Classroom at LBEF College", label: "Classrooms" },
  { src: seminarHall, alt: "Lecture hall at LBEF College", label: "Lecture Halls" },
  { src: lobby, alt: "Reception lobby at LBEF College", label: "Reception & Lobby" },
];

const InfrastructureSection = () => {
  return (
    <section className="py-14 md:py-20 bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: copy */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="mb-5 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
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

            <p className="mb-8 leading-relaxed text-gray-600">
              In the heart of Kathmandu, LBEF College spans approximately 7
              ropani with more than 50,000 sq. ft. of built-up area across six
              purpose-oriented blocks — bringing classrooms, laboratories,
              libraries, student services and recreation together in one
              accessible location.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="p-3 bg-white shadow-sm rounded-xl"
                >
                  <div className="mb-1.5 text-[#474AFF]">{item.icon}</div>
                  <p className="text-lg font-bold text-gray-900">{item.value}</p>
                  <p className="text-xs text-gray-600">{item.label}</p>
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

          {/* Right: image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {/* Buildings are shot in portrait, so the campus photo gets a tall
                tile of its own and the interiors stack alongside it. */}
            <div className="row-span-2 overflow-hidden shadow-lg rounded-2xl group">
              <img
                src={campusHero}
                alt="LBEF College campus building"
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {tiles.map((tile, index) => (
              <div
                key={tile.label}
                className={`relative overflow-hidden shadow-lg rounded-2xl group ${
                  index === tiles.length - 1 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={tile.src}
                  alt={tile.alt}
                  loading="lazy"
                  className="object-cover w-full h-32 transition-transform duration-500 sm:h-40 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <span className="absolute text-sm font-semibold text-white bottom-3 left-3">
                  {tile.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
