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
import SectionHeading from "./SectionHeading";

const facilities = [
  {
    icon: Laptop,
    title: "Computer laboratories",
    description:
      "Seven computer and specialised labs carry the practical half of every IT programme.",
  },
  {
    icon: Cpu,
    title: "App development lab",
    description:
      "A room set aside for mobile and application projects, from first sketch to working build.",
  },
  {
    icon: Network,
    title: "Networking lab",
    description:
      "Real equipment to configure, break and rebuild — the way networking is actually learned.",
  },
  {
    icon: MonitorPlay,
    title: "Software Development Wing",
    description:
      "Students build production software here alongside academic and technical staff.",
  },
  {
    icon: Server,
    title: "Server room",
    description:
      "Access-controlled, UPS-backed, and running the services the whole campus depends on.",
  },
  {
    icon: Library,
    title: "Library, on shelves and on screen",
    description:
      "Two library spaces pairing printed collections with online research databases.",
  },
  {
    icon: BookOpen,
    title: "Audio-visual room",
    description:
      "Media-equipped for recorded lectures, presentations and screenings.",
  },
  {
    icon: Users,
    title: "Collaborative learning hubs",
    description:
      "Three hubs for group study, project work and the conversations between classes.",
  },
];

const AcademicSpaces = () => {
  return (
    <section className="mb-20 md:mb-28">
      <SectionHeading
        eyebrow="Learning environment"
        title="Built for a college that teaches"
        highlightedText="technology"
        subtitle="Academic delivery runs on 32 classrooms and tutorial rooms, two lecture and seminar halls, seven laboratories, two libraries and the faculty spaces around them."
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <p className="text-base leading-relaxed text-gray-700">
              The campus is laid out around the student journey — admission and
              counselling, orientation, classroom learning, practical training,
              examinations, placement, and then the alumni network that follows.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
              Because LBEF specialises in information technology and management,
              the technical side of that journey gets its own dedicated
              infrastructure rather than a shared room booked by the hour.
            </p>
            <div className="p-5 mt-8 border border-blue-100 bg-blue-50/60 rounded-2xl">
              <div className="text-3xl font-bold text-blue-600 tabular-nums">
                7
              </div>
              <p className="mt-1 text-sm text-gray-600">
                computer and specialised laboratories across the six blocks
              </p>
            </div>
          </motion.div>
        </div>

        <ul className="lg:col-span-8 sm:grid sm:grid-cols-2 sm:gap-x-10">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;

            return (
              <motion.li
                key={facility.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: (index % 2) * 0.06 }}
                className="py-5 border-t border-gray-200 group last:border-b sm:last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 text-blue-600 transition-colors rounded-full shrink-0 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#0B1220]">
                      {facility.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AcademicSpaces;
