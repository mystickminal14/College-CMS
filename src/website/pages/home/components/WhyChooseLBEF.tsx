import { Award, BookOpen, Briefcase, GraduationCap, TrendingUp, Users } from "lucide-react";
import lbef_bufferfly from "../../../../assets/pcpslogo.webp";
import decoration from "../../../../assets/decoration.webp";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function WhyChooseLBEF() {
  const desktopFeatures = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      topTitle: "100%",
      title: "Internship Assured",
      position: "top-left",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      topTitle: "World Class",
      title: "Degree",
      position: "top-right",
    },
    {
      icon: <Users className="w-6 h-6" />,
      topTitle: "Employment",
      title: "Opportunities",
      position: "right",
    },
    {
      icon: <Award className="w-6 h-6" />,
      topTitle: "Up to",
      title: "100% Scholarship",
      position: "bottom-right",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      topTitle: "Industry",
      title: "Focused Curriculum",
      position: "bottom-left",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      topTitle: "Career",
      title: "Growth Support",
      position: "left",
    },
  ];

  return (
    <>

      <section className="hidden lg:block py-20 bg-linear-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 100 }} // start below
            whileInView={{ opacity: 1, y: 0 }} // animate to position
            viewport={{ once: true, amount: 0.3 }} // trigger once when in view
            transition={{ type: "spring", stiffness: 120, damping: 15 }} // spring effect
            className="text-5xl font-bold mb-10"
          >
            Why{" "}
            <motion.span
              className="relative text-[#474AFF] inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 15 }}
            >
              Choose
              <motion.img
                src={decoration}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4, type: "spring", stiffness: 120 }}
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </motion.span>{" "}
            LBEF College?
          </motion.h2>


          <p className="text-lg text-gray-600 max-w-2xl  mx-auto">
            Unlock your true potential and discover a world of opportunities
            that align with your skills, interests, and aspirations
          </p>

          <div className="relative h-[650px] flex items-center justify-center mt-10">
            <div className="absolute w-[300px] h-[300px] rounded-full border-4 border-blue-100 opacity-30" />
            <div className="absolute w-[400px] h-[400px] rounded-full border-4 border-blue-100 opacity-20" />

            <Orbit size={300} duration="6s" />
            <Orbit size={400} duration="10s" />

            <div className="z-20 w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center">
              <img src={lbef_bufferfly} className="w-full h-full object-contain" />
            </div>

            {desktopFeatures.map((f, i) => (
              <DesktopCard key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MOBILE (2 + LOGO + 2) ================= */}
      <section className="lg:hidden py-8 bg-linear-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Why{" "}
            <span className="relative text-[#474AFF] inline-block">
              Choose
              <img
                src={decoration}
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>{" "}
            LBEF ?
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Unlock your true potential and discover a world of opportunities.
          </p>

          <div className="flex flex-col items-center gap-8">
            {/* Top cycling card */}
            <MobileCyclingCard features={desktopFeatures.slice(0, 2)} />

            {/* Center logo with orbit */}
            <div className="relative flex items-center justify-center w-[200px] h-[200px]">
              <div className="absolute w-[150px] h-[150px] rounded-full border-4 border-blue-100 opacity-30" />
              <div className="absolute w-[250px] h-[250px] rounded-full border-4 border-blue-100 opacity-20" />
              <Orbit size={150} duration="6s" />
              <Orbit size={250} duration="10s" />
              <div className="z-20 w-[110px] h-[110px] bg-white rounded-full shadow-xl flex items-center justify-center">
                <img src={lbef_bufferfly} className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Bottom cycling card */}
            <MobileCyclingCard features={desktopFeatures.slice(2, 4)} />
          </div>
        </div>
      </section>
    </>
  );
}



function DesktopCard({ icon, topTitle, title, position }: any) {
  const map: any = {
    "top-left": "top-[70px] left-[155px]",
    "top-right": "top-[70px] right-[195px]",
    right: "right-[100px] top-[280px]",
    "bottom-right": "bottom-[70px] right-[145px]",
    "bottom-left": "bottom-[70px] left-[145px]",
    left: "left-[60px] top-[280px]",
  };

  return (
    <div className={`absolute ${map[position]}`}>
      <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-3xl shadow-xl hover:scale-105 transition">

        <div className="p-2 bg-blue-100 rounded-full text-[#474AFF]">

          {icon}
        </div>
        <div className="font-bold text-gray-800 whitespace-nowrap text-sm">
          <p>{topTitle}</p>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}

function MobileCard({ icon, topTitle, title }: any) {
  return (
    <div className="flex items-center gap-2 bg-white px-1 py-3 rounded-xl shadow-md">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-[#474AFF]">
        {icon}
      </div>
      <div className="font-bold text-gray-800 whitespace-nowrap text-sm">
        <p>{topTitle}</p>
        <p>{title}</p>
      </div>
    </div>
  );
}

function MobileCyclingCard({ features }: { features: any[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const f = features[current];

  return (
    <motion.div
      key={current}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MobileCard icon={f.icon} topTitle={f.topTitle} title={f.title} />
    </motion.div>
  );
}

function Orbit({ size, duration }: { size: number; duration: string }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        animation: `orbit ${duration} linear infinite`,
      }}
    >
      <div className="w-4 h-4 bg-[#474AFF] rounded-full absolute -top-2 left-1/2 -translate-x-1/2" />
    </div>
  );
}