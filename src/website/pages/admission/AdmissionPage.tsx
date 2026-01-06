import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, type Variants } from "framer-motion";
import decoration from "../../../assets/decoration.webp";
import useGetIntakes from "../../../pages/intake-calender/hooks/useGetAllIntakr";
import AdmissionTOC from "./components/AdmissionToc";
import IntakeCardsSection from "./components/IntakeCardSection";
import ApplicationProcess from "./components/ApplicationProcess";
import ImportantNotes from "./components/ImportantNotes";
import ClassTiming from "./components/ClassTiming";
import DocumentsRequired from "./components/DocumentRequired";
import FeePolicy from "./components/Feepolicy";
import ImportantNotice from "./components/ImportantNotice";
import ScholarshipSection from "./components/ScholarShip";
import FAQSection from "./components/Faq";
import { fadeUp } from "../../comp/animation";


export const sectionFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1], // TS-safe easeOut
    },
  },
};


interface TocItem {
  id: string;
  label: string;
  level: number;
}


const AdmissionProcedure = () => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const tocRef = useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] = useState("");

  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const { data: intakeData, isLoading, isError } = useGetIntakes();
  const intakes = intakeData?.data ?? [];

  const tocItems: TocItem[] = [
    { id: "intake-schedule", label: "Intake Schedule", level: 1 },
    { id: "application-process", label: "Application Process", level: 1 },
    { id: "documents-required", label: "Documents Required", level: 1 },
    { id: "important-notes", label: "Important Notes", level: 1 },
    { id: "important-notice", label: "Important Notice", level: 1 },
    { id: "class-timing", label: "Class Timing", level: 1 },
    { id: "scholarship", label: "Scholarship", level: 1 },
    { id: "fee-policy", label: "Fee Refund Policy", level: 1 },
    { id: "faq", label: "Frequently Asked Questions", level: 1 },
  ];


  useEffect(() => {
    if (!activeSection && tocItems.length) {
      setActiveSection(tocItems[0].id);
    }
  }, [activeSection, tocItems]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);


  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (!section) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    isProgrammaticScroll.current = true;
    setActiveSection(id);

    window.scrollTo({
      top: section.offsetTop - 100,
      behavior: "smooth",
    });

    scrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100"
          >
            <motion.span
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut" as const
              }}
            />
            <span className="text-blue-600 font-medium text-sm">
              Prospective
            </span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            Admission{" "}
            <span className="relative inline-block text-blue-600">
              Procedure
              <motion.img
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
              />
            </span>
            <br />
            <span> for New Applicant</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
            A clear guide to the admission process, eligibility and timelines.
          </motion.p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdmissionTOC
            tocItems={tocItems}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            tocRef={tocRef as RefObject<HTMLDivElement>}
          />

          <main className="lg:w-3/4 space-y-16">
            {[
              ["intake-schedule", <IntakeCardsSection intakes={intakes} isLoading={isLoading} isError={isError} />],
              ["application-process", <ApplicationProcess intakes={intakes} isLoading={isLoading} isError={isError} />],
              ["documents-required", <DocumentsRequired />],
              ["important-notes", <ImportantNotes />],
              ["important-notice", <ImportantNotice />],
              ["class-timing", <ClassTiming />],
              ["scholarship", <ScholarshipSection />],
              ["fee-policy", <FeePolicy />],
              ["faq", <FAQSection />],
            ].map(([id, component]) => (
              <section
                key={id as string}
                id={id as string}
                ref={(el) => {
                  sectionRefs.current[id as string] = el; // ✅ void return
                }}
              >
                <motion.div
                  variants={sectionFadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {component}
                </motion.div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdmissionProcedure;
