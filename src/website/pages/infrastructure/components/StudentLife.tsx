import { motion } from "framer-motion";
import {
  Briefcase,
  Car,
  Coffee,
  GraduationCap,
  HeartPulse,
  LifeBuoy,
  MessageCircleHeart,
  Trophy,
} from "lucide-react";
import { recreationActivities } from "../data";
import SectionHeading from "./SectionHeading";

const supportFacilities = [
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: "Infirmary",
    description:
      "On-campus first aid and rest space for students who fall unwell during the day.",
  },
  {
    icon: <MessageCircleHeart className="w-6 h-6" />,
    title: "Counselling Rooms",
    description:
      "Private rooms for academic guidance, personal counselling and pastoral support.",
  },
  {
    icon: <LifeBuoy className="w-6 h-6" />,
    title: "Student Support Department",
    description:
      "A single point of contact for enrolment, documentation and day-to-day queries.",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Training & Placement Cell",
    description:
      "Internship placement, employability training and industry connections.",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Alumni Cell",
    description:
      "Keeps graduates connected to the college through mentoring and networking.",
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "Café & Canteen",
    description:
      "Two dining spaces for meals, breaks and informal conversation between classes.",
  },
];

const StudentLife = () => {
  return (
    <section className="mb-16 md:mb-20">
      <SectionHeading
        title="Student Support and"
        highlightedText="Campus Life"
        subtitle="Student wellbeing and personal development are central to the LBEF campus experience. Alongside academic facilities, the College provides health, counselling, career and recreational services designed to support students throughout their time here."
      />

      <div className="grid gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        {supportFacilities.map((facility, index) => (
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
              delay: index * 0.07,
            }}
            className="flex gap-4 p-5 border border-gray-200 shadow-lg bg-linear-to-br from-white to-gray-50 rounded-2xl"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 text-blue-600 rounded-full shrink-0 bg-blue-50">
              {facility.icon}
            </div>
            <div>
              <h3 className="mb-1 font-bold text-gray-900">{facility.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {facility.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="p-6 border border-gray-200 shadow-lg bg-linear-to-br from-white to-gray-50 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 text-blue-600 rounded-full bg-blue-50">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Indoor &amp; Outdoor Recreation
            </h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            Students can take part in a range of indoor and outdoor activities
            across the campus.
          </p>
          <div className="flex flex-wrap gap-2">
            {recreationActivities.map((activity) => (
              <span
                key={activity}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-full"
              >
                {activity}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.1,
          }}
          className="p-6 border border-gray-200 shadow-lg bg-linear-to-br from-white to-gray-50 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 text-blue-600 rounded-full bg-blue-50">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Parking</h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            Parking facilities are available within the Laligurans, Sunkhari and
            Danphe blocks, keeping the campus accessible for students, staff and
            visitors arriving by vehicle.
          </p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-10 leading-relaxed text-center text-gray-600"
      >
        Overall, LBEF's infrastructure represents a coordinated and future-ready
        campus ecosystem where academic excellence, digital innovation, student
        wellbeing, recreation, employability and institutional leadership come
        together in one accessible location.
      </motion.p>
    </section>
  );
};

export default StudentLife;
