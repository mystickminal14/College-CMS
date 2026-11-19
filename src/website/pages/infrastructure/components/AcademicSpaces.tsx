import { motion } from "framer-motion";
import {
  BookOpen,
  Cpu,
  Laptop,
  Library,
  MonitorPlay,
  Network,
  Server,
  Users,
} from "lucide-react";
import smartClassroom from "../../../../assets/infrastructure/classroom-02.webp";
import SectionHeading from "./SectionHeading";

const facilities = [
  {
    icon: Laptop,
    title: "Computer laboratories",
    description: "Seven computer and specialised labs carry the practical half of every IT programme.",
  },
  {
    icon: Cpu,
    title: "App development lab",
    description: "A room set aside for mobile and application projects, from first sketch to working build.",
  },
  {
    icon: Network,
    title: "Networking lab",
    description: "Real equipment to configure, break and rebuild — the way networking is actually learned.",
  },
  {
    icon: MonitorPlay,
    title: "Software Development Wing",
    description: "Students build production software here alongside academic and technical staff.",
  },
  {
    icon: Server,
    title: "Server room",
    description: "Access-controlled, UPS-backed, and running the services the whole campus depends on.",
  },
  {
    icon: Library,
    title: "Library, print and digital",
    description: "Two library spaces pairing printed collections with online research databases.",
  },
  {
    icon: BookOpen,
    title: "Audio-visual room",
    description: "Media-equipped for recorded lectures, presentations and screenings.",
  },
  {
    icon: Users,
    title: "Collaborative learning hubs",
    description: "Three hubs for group study, project work and the conversations between classes.",
  },
];

/** Tinted full-width band: a feature photo beside a grid of facility cards. */
const AcademicSpaces = () => {
  return (
    <section className="py-20 mb-20 md:py-28 md:mb-28 bg-slate-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Learning environment"
            title="Built for a college that teaches"
            highlightedText="technology"
            subtitle="32 classrooms and tutorial rooms, two lecture and seminar halls, seven laboratories, two libraries and the faculty spaces around them."
          />

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="relative m-0 overflow-hidden shadow-lg lg:col-span-5 rounded-3xl min-h-[22rem] lg:min-h-full"
            >
              <img
                src={smartClassroom}
                alt="Smart classroom at LBEF College"
                loading="lazy"
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0B1220]/90 via-[#0B1220]/20 to-transparent" />

              <span className="absolute px-3 py-1 text-xs font-semibold rounded-full top-5 left-5 bg-white/90 text-[#0B1220] backdrop-blur">
                Smart classroom
              </span>

              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex items-end gap-4">
                  <span className="text-6xl font-bold leading-none text-white tabular-nums">7</span>
                  <span className="pb-1 text-sm leading-snug text-white/75">
                    computer and specialised
                    <br />
                    laboratories on campus
                  </span>
                </div>
                <p className="max-w-sm mt-4 text-sm leading-relaxed text-white/60">
                  The technical side of every programme gets its own dedicated rooms, not a shared space
                  booked by the hour.
                </p>
              </figcaption>
            </motion.figure>

            <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
              {facilities.map((facility, index) => {
                const Icon = facility.icon;
                return (
                  <motion.div
                    key={facility.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: (index % 2) * 0.06 }}
                    className="p-5 transition-all duration-300 bg-white shadow-sm group rounded-2xl ring-1 ring-gray-100 hover:-translate-y-1 hover:shadow-lg hover:ring-blue-100"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid text-blue-600 transition-colors shrink-0 size-11 place-items-center rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[#0B1220]">{facility.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">{facility.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicSpaces;
