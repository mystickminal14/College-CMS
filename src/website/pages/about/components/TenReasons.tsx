import {
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Users,
  Library,
  Users2,
} from "lucide-react";
import lbef_bufferfly from "../../../../assets/pcpslogo.webp";
import decoration from "../../../../assets/decoration.webp";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  topTitle: string;
  title: string;
  angle: number;
  index: number;
}

interface CardProps {
  icon: ReactNode;
  topTitle: string;
  title: string;
}

export function TenReasons() {
  const features: Feature[] = [
    {
      icon: <Award className="w-7 h-7" />,
      topTitle: "Nepal's",
      title: "First IT College",
      angle: -54,
      index: 1,
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      topTitle: "Industry 4.0 &",
      title: "OBE Based Curriculum",
      angle: -18,
      index: 2,
    },
    {
      icon: <Award className="w-7 h-7" />,
      topTitle: "Scholarships",
      title: "Up to 100%",
      angle: 18,
      index: 3,
    },
    {
      icon: <Briefcase className="w-7 h-7" />,
      topTitle: "Industry Ready",
      title: "100% Assured Internship",
      angle: 54,
      index: 4,
    },
    {
      icon: <GraduationCap className="w-7 h-7" />,
      topTitle: "World Ranked",
      title: "Recognized Degrees",
      angle: 126,
      index: 5,
    },
    {
      icon: <Users className="w-7 h-7" />,
      topTitle: "Highly Qualified",
      title: "Faculty Members",
      angle: 162,
      index: 6,
    },
    {
      icon: <Users2 className="w-7 h-7" />,
      topTitle: "13,500+",
      title: "Alumni Network",
      angle: 198,
      index: 7,
    },
    {
      icon: <Library className="w-7 h-7" />,
      topTitle: "Access to",
      title: "Leading Online Libraries",
      angle: 234,
      index: 8,
    },
  ];


  return (
    <>
      {/* ================= DESKTOP ================= */}
      <section className="hidden lg:block py-16 bg-linear-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="text-4xl font-bold mb-3"
          >
            Discover why{" "}
            <motion.span
              className="relative text-[#474AFF] inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 15 }}
            >
              LBEF College
              <motion.img
                src={decoration}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4, type: "spring", stiffness: 120 }}
                className="absolute left-1/2 -translate-x-1/2 w-full h-2"
                alt=""
              />
            </motion.span>
          </motion.h2>

          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10">
            Discover why LBEF stands out as Nepal's premier IT education destination
          </p>

          <div className="relative flex items-center justify-center min-h-[700px]">
            {/* Circular arrangement of cards */}
            {features.map((feature, index) => {
              const radius = 300; // Reduced from 400 for smaller layout
              const angle = (feature.angle * Math.PI) / 180;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              return (
                <motion.div
                  key={feature.index}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    x: x,
                    y: y
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="absolute"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                >
                  <CircularCard
                    icon={feature.icon}
                    topTitle={feature.topTitle}
                    title={feature.title}
                  />
                </motion.div>
              );
            })}

            {/* Center logo - reduced size */}
            <div className="relative z-20 w-48 h-48 bg-white rounded-full shadow-xl flex items-center justify-center p-6">
              <img src={lbef_bufferfly} className="w-full h-full object-contain" alt="LBEF Logo" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOBILE ================= */}
      <section className="lg:hidden py-12 bg-linear-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">
            10 Reasons to{" "}
            <span className="relative text-[#474AFF] inline-block">
              Visit LBEF
              <img
                src={decoration}
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
                alt=""
              />
            </span>
          </h2>

          <p className="text-sm text-gray-600 mb-8 text-center">
            Discover why LBEF stands out as Nepal's premier IT education destination
          </p>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-[120px] h-[120px] bg-white rounded-full shadow-xl flex items-center justify-center p-4">
              <img src={lbef_bufferfly} className="w-full h-full object-contain" alt="LBEF Logo" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <MobileCard
                key={index}
                icon={feature.icon}
                topTitle={feature.topTitle}
                title={feature.title}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CircularCard({ icon, topTitle, title }: CardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] w-64 border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="shrink-0 p-2 bg-blue-100 rounded-full text-[#474AFF]">
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-base leading-tight mb-1">{topTitle}</p>
          <p className="text-gray-700 text-sm leading-tight">{title}</p>
        </div>
      </div>
    </div>
  );
}

function MobileCard({ icon, topTitle, title }: CardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <div className="flex items-start gap-3 flex-wrap">
        <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-[#474AFF]">
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-sm leading-tight mb-1">{topTitle}</p>
          <p className="text-gray-700 text-xs leading-tight">{title}</p>
        </div>
      </div>
    </div>
  );
}