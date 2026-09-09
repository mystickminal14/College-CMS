import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import classroom from "../../../../assets/infrastructure/classroom-02.webp";
import lectureHall from "../../../../assets/infrastructure/seminar-hall-01.webp";
import reception from "../../../../assets/infrastructure/reception-02.webp";
import serverRoom from "../../../../assets/infrastructure/server-room-01.webp";
import { campusHero } from "../data";

const tiles = [
  { src: classroom, alt: "Classroom at LBEF College", label: "Classrooms" },
  {
    src: lectureHall,
    alt: "Lecture hall at LBEF College",
    label: "Lecture Halls",
  },
  { src: reception, alt: "Reception at LBEF College", label: "Reception" },
  { src: serverRoom, alt: "Server room at LBEF College", label: "Server Room" },
];

const CampusCollage = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className="mb-16 md:mb-20"
  >
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {/* Campus buildings are shot in portrait, so the exterior photo gets a
            tall tile of its own and the interiors sit alongside it. */}
      <div className="col-span-2 overflow-hidden rounded-2xl md:col-span-1 md:row-span-2">
        <img
          src={campusHero}
          alt="LBEF College campus building in Kathmandu"
          className="object-cover w-full h-56 md:h-[26rem]"
          loading="eager"
        />
      </div>

      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="relative overflow-hidden rounded-2xl group"
        >
          <img
            src={tile.src}
            alt={tile.alt}
            loading="lazy"
            className="object-cover w-full h-32 transition-transform duration-500 md:h-[12.5rem] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" />
          <span className="absolute text-xs font-semibold text-white bottom-2.5 left-3 md:text-sm">
            {tile.label}
          </span>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-center gap-2 mt-5 text-sm font-medium text-blue-600">
      <MapPin className="w-4 h-4" />
      Kathmandu, Nepal
    </div>
  </motion.section>
);

export default CampusCollage;
