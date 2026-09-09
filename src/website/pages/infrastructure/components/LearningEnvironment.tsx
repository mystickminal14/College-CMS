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

const techFacilities = [
  {
    icon: <Laptop className="w-6 h-6" />,
    title: "Computer Laboratories",
    description:
      "Seven computer and specialised laboratories supporting practical, hands-on coursework.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "App Development Lab",
    description:
      "A dedicated space for mobile and application development projects.",
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Networking Lab",
    description:
      "Equipment and configuration environments for networking coursework and certification practice.",
  },
  {
    icon: <MonitorPlay className="w-6 h-6" />,
    title: "Software Development Wing",
    description:
      "A working wing where students build real software alongside academic teams.",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Secure Server Room",
    description:
      "A dedicated, access-controlled server room powering campus-wide IT services.",
  },
  {
    icon: <Library className="w-6 h-6" />,
    title: "Physical & Digital Library",
    description:
      "Two library spaces combining printed collections with online research databases.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Audio-Visual Room",
    description:
      "A media-equipped room for recorded lectures, presentations and screenings.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaborative Learning Hubs",
    description:
      "Three learning hubs designed for group study, project work and peer collaboration.",
  },
];

const LearningEnvironment = () => {
  return (
    <section className="mb-16 md:mb-20">
      <SectionHeading
        title="An Integrated"
        highlightedText="Learning"
        trailing="Environment"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mb-12 space-y-4 text-center"
      >
        <p className="leading-relaxed text-gray-600">
          LBEF College has developed a comprehensive multi-block infrastructure
          that supports every stage of the student journey — from admission,
          counselling and orientation to classroom learning, practical training,
          examinations, career placement and alumni engagement.
        </p>
        <p className="leading-relaxed text-gray-600">
          As an institution specialising in information technology and
          management education, LBEF provides a strong technology-enabled
          learning environment. Academic delivery is supported by around 32
          classrooms and tutorial rooms, two lecture and seminar halls, seven
          computer and specialised laboratories, physical and digital libraries,
          faculty rooms and dedicated offices for programme leaders and academic
          teams.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {techFacilities.map((facility, index) => (
          <motion.div
            key={facility.title}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: index * 0.06,
            }}
            className="p-5 border border-gray-200 shadow-lg bg-linear-to-br from-white to-gray-50 rounded-2xl"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-blue-600 bg-blue-50 rounded-full">
              {facility.icon}
            </div>
            <h3 className="mb-2 font-bold text-gray-900">{facility.title}</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {facility.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LearningEnvironment;
