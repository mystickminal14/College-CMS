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
    icon: HeartPulse,
    title: "Infirmary",
    description:
      "First aid and a quiet bed for anyone who falls unwell during the day.",
  },
  {
    icon: MessageCircleHeart,
    title: "Counselling rooms",
    description:
      "Private rooms for academic guidance and personal counselling.",
  },
  {
    icon: LifeBuoy,
    title: "Student Support Department",
    description:
      "One desk for enrolment, documentation and the questions that come up mid-semester.",
  },
  {
    icon: Briefcase,
    title: "Training and Placement Cell",
    description:
      "Internships, employability training and the industry contacts behind them.",
  },
  {
    icon: GraduationCap,
    title: "Alumni Cell",
    description:
      "Keeps graduates in the room — mentoring, referrals and networking.",
  },
  {
    icon: Coffee,
    title: "Café and canteen",
    description:
      "Two places to eat, and the ones where most of the group projects start.",
  },
];

const StudentLife = () => {
  return (
    <section className="mb-20 md:mb-28">
      <SectionHeading
        eyebrow="Student life"
        title="The parts of campus that aren't a"
        highlightedText="classroom"
        subtitle="Health, counselling, careers and recreation run alongside teaching — not as an afterthought to it."
      />

      <div className="grid gap-3 mb-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
        {supportFacilities.map((facility, index) => {
          const Icon = facility.icon;

          return (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
              className="p-5 transition-colors border border-gray-200 group rounded-2xl hover:border-blue-300 hover:bg-blue-50/40"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 mb-4 text-blue-600 transition-colors rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="font-semibold text-[#0B1220]">{facility.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                {facility.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-3 md:grid-cols-5 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="p-6 text-white md:col-span-3 bg-blue-600 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-full size-11 bg-white/15">
              <Trophy className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold">Recreation, indoor and out</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Five activities run across the campus between classes and after
            them.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {recreationActivities.map((activity) => (
              <span
                key={activity}
                className="px-3 py-1.5 text-sm font-medium border rounded-full border-white/25 bg-white/10"
              >
                {activity}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="p-6 border border-gray-200 md:col-span-2 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center text-blue-600 rounded-full size-11 bg-blue-50">
              <Car className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-[#0B1220]">Parking</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Laligurans, Sunkhari and Danphe each have parking on site, so
            arriving by vehicle does not mean circling the neighbourhood.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentLife;
