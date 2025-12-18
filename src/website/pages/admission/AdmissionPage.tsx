import { useEffect, useRef, useState, type RefObject } from "react";
import CustomBreadcrumb from "../../comp/bread-crump";
import bgImage from "../../../assets/OurTeam.jpg";
import decoration from "../../../assets/decoration.png";

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

interface TocItem {
    id: string;
    label: string;
    level: number;
}

const AdmissionProcedure = () => {
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const tocRef = useRef<HTMLDivElement | null>(null);

    const [activeSection, setActiveSection] = useState<string>("");

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

        { id: "fee-policy", label: "Fee Policy", level: 1 },
    ];

    // Set  active section
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
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top -
                            b.boundingClientRect.top
                    );

                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id);
                }
            },
            {
                root: null,
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

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <CustomBreadcrumb
                bgImage={bgImage}
                title="Admission Process"
                objectPosition="50%_40%"
                breadcrumbs={[
                    { label: "Home" },
                    { label: "Students" },
                    { label: "Academic Planner" },
                ]}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14 text-center">
                <div className="max-w-8xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-blue-600 font-medium text-sm">Prospective</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                        <span className="text-gray-900">Admission </span>
                        <span className="relative inline-block ml-2">
                            <span className="text-blue-600 relative z-10"> Procedure</span>
                            <img
                                src={decoration}
                                alt="Decoration"
                                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
                            />
                        </span>
                    </h1>

                    <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        A clear guide to the admission process, eligibility and timelines.

                    </p>
                </div>
            </div>


            <div className="container mx-auto px-4 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    <AdmissionTOC
                        tocItems={tocItems}
                        activeSection={activeSection}
                        scrollToSection={scrollToSection}
                     tocRef={tocRef as RefObject<HTMLDivElement>} 
                    />

                    <main className="lg:w-3/4 space-y-12">
                        <section
                            id="intake-schedule"
                            ref={(el) => {
                                sectionRefs.current["intake-schedule"] = el;
                            }}
                            className="scroll-mt-24"
                        >
                            <IntakeCardsSection
                                intakes={intakes}
                                isLoading={isLoading}
                                isError={isError}
                            />
                        </section>

                        <section
                            id="application-process"
                            ref={(el) => {
                                sectionRefs.current["application-process"] = el;
                            }}
                            className="scroll-mt-24"
                        >
                            <ApplicationProcess />
                        </section>

                        <section
                            id="documents-required"
                            ref={(el) => {
                                sectionRefs.current["documents-required"] = el;
                            }}
                            className="scroll-mt-24"
                        >
                            <DocumentsRequired />
                        </section>

                        <section
                            id="important-notes"
                            ref={(el) => {
                                sectionRefs.current["important-notes"] = el;
                            }}
                            className="scroll-mt-24"
                        >
                            <ImportantNotes />
                        </section>
                        <section
                            id="important-notice"
                            ref={(el) => {
                                sectionRefs.current["important-notice"] = el;
                            }}
                            className="scroll-mt-24"
                        >
                            <ImportantNotice />
                        </section>
                        <section
                            id="class-timing"
                            ref={(el) => {
                                sectionRefs.current["class-timing"] = el;
                            }}
                            className="scroll-mt-24"
                        >
                            <ClassTiming />
                        </section>
                        <section
                            id="scholarship"
                            ref={(el) => {
                                sectionRefs.current["scholarship"] = el;
                            }}
                            className="scroll-mt-24"
                        >
                            <ScholarshipSection />
                        </section>

                        <section
                            id="fee-policy"
                            ref={(el) => {
                                sectionRefs.current["fee-policy"] = el;
                            }}
                            className="scroll-mt-24"
                        >
                            <FeePolicy />
                        </section>



                    </main>
                </div>
            </div>

        </div>
    );
};

export default AdmissionProcedure;
