import { Award, BookOpen, Calendar, Clock, GraduationCap, ChevronRight } from "lucide-react";
import courseImage from "../../assets/login.png";
import { useState, useEffect, useRef } from "react";

const CourseDetails = () => {
    const [activeSection, setActiveSection] = useState("aim-of-course");
    const sectionRefs = useRef({});

    const tocItems = [
        { id: "aim-of-course", label: "Aim Of Course" },
        { id: "corporate-readiness", label: "Corporate Readiness Program" },
        { id: "program-outline", label: "Program Outline" },
        { id: "degree-level-1", label: "Degree Level 1" },
        { id: "common-variables", label: "Common Variables" },
        { id: "specialized-modules-1", label: "Specialized Modules" },
        { id: "degree-level-2", label: "Degree Level 2" },
        { id: "common-modules", label: "Common Modules" },
        { id: "specialized-modules-2", label: "Specialized Modules" },
        { id: "interactive", label: "Interactive" },
        { id: "degree-level-3", label: "Degree Level 3" },
        { id: "common-modules-3", label: "Common Modules" },
        { id: "specialized-modules-3", label: "Specialized Modules" },
        { id: "course-options", label: "Course Options" },
        { id: "degree-recognition", label: "Degree & Recognition" },
        { id: "entry-requirements", label: "Entry Requirements" },
        { id: "english-requirement", label: "English Requirement" },
    ];

    const scrollToSection = (sectionId) => {
        if (sectionRefs.current[sectionId]) {
            sectionRefs.current[sectionId].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            setActiveSection(sectionId);
        }
    };

    // Handle scroll to update active section
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            for (const [id, ref] of Object.entries(sectionRefs.current)) {
                if (ref) {
                    const sectionTop = ref.offsetTop;
                    const sectionHeight = ref.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && 
                        scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            {/* Top Section - Course Header */}
            <div className="p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-6">
                        {/* LEFT: Content */}
                        <div className="lg:w-1/2">
                            <div className="mb-8">
                                <div className="inline-block bg-linear-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                                    BACHELOR'S DEGREE
                                </div>
                                <h1 className="
                                    text-xl
                                    sm:text-3xl
                                    md:text-4xl
                                    lg:text-5xl
                                    font-bold
                                    text-gray-900
                                    leading-snug
                                    text-center
                                    md:text-left
                                ">
                                    <span className="text-blue-700">
                                        BSc. (Hons) Information Technology
                                    </span>
                                    <span className="text-gray-800 ml-1">
                                        with Specialism in Internet of Things (IoT)
                                    </span>
                                </h1>

                                <div className="w-24 h-1 text-center md:text-left bg-linear-to-r from-blue-600 to-indigo-600 mt-6 rounded-full"></div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Class Timings</p>
                                        <p>6:30 AM – 10:30 AM</p>
                                        <p className="text-gray-500">Tutorials: 10:30 AM – 12:30 PM</p>
                                        <p className="text-gray-500">(Sunday – Friday)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Duration</p>
                                        <p>3 Years (6 Semesters)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Teaching Language</p>
                                        <p>English</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Credits</p>
                                        <p>123 Credit Hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:col-span-2">
                                    <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Degree Awarded By</p>
                                        <p>Asia Pacific University of Technology & Innovation (APU)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button className="
                                    bg-linear-to-r
                                    from-blue-600 to-indigo-600
                                    hover:from-blue-700 hover:to-indigo-700
                                    text-white
                                    font-bold
                                    py-4
                                    px-10
                                    rounded-xl
                                    shadow-lg
                                    hover:shadow-xl
                                    transition-all
                                    duration-300
                                    text-lg
                                    w-full
                                    md:w-auto
                                    flex
                                    items-center
                                    justify-center
                                    group
                                ">
                                    <span>Apply for Scholarship</span>
                                    <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: Image */}
                        <div className="lg:w-1/2 flex justify-center">
                            <div className="w-full max-w-lg">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                    <img
                                        src={courseImage}
                                        alt="Course Preview"
                                        className="w-full h-[320px] md:h-[420px] lg:h-[520px] object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area with Table of Contents */}
            <div className="p-4 md:p-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* LEFT: Table of Contents - Hidden on mobile */}
                    <div className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-8 bg-white rounded-xl shadow-lg p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b">On this page</h3>
                            <nav className="space-y-2">
                                {tocItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                                            activeSection === item.id
                                                ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                        {activeSection === item.id && (
                                            <ChevronRight className="w-4 h-4" />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* RIGHT: Content */}
                    <div className="lg:w-3/4">
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            {/* Aim Of Course */}
                            <section 
                                ref={(el) => (sectionRefs.current["aim-of-course"] = el)}
                                id="aim-of-course"
                                className="mb-12 scroll-mt-24"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">
                                    Aim Of Course
                                </h2>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4">
                                        B.Sc.T. (Intra-2) is a full-time campus based course of 123 credit. Degree will be awarded by F-Zur Road, Amber Worship University, Blackies from any faculty can join.
                                    </p>
                                    <p className="mb-4">The main areas of the course are:</p>
                                    <ul className="space-y-3 pl-5 mb-6">
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            Facilitate your programme, both academic and practical, by developing knowledge, key skills and the capacity for independent study to help identify.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            Develop your skills in imaginative practice and/or go outside-masking.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            Help you develop a Personal Development Portfolio to support your career aspirations.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            Provide you with a faithfully structured and accessible context of study that gives you a sense of spirit of information technology knowledge to make sure an entrepreneurial team within your own develop and apply in your future employment.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            Develop your imagination and interactive abilities and help you show insights and creativity in their work.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            Develop your intelligence, linguistic, inventiveness and independence as well as your communication skills.
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Corporate Readiness Program */}
                            <section 
                                ref={(el) => (sectionRefs.current["corporate-readiness"] = el)}
                                id="corporate-readiness"
                                className="mb-12 scroll-mt-24"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">
                                    Corporate Readiness Program
                                </h2>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4">
                                        Enabling IT and Management graduates become industry-ready by acquiring and monitoring the knowledge, skills and attitudes required to deliver organizational goals.
                                    </p>
                                    <p className="mb-4">
                                        Corporate Readiness Program is provided with a core objective of leading our students to discover the path to a rewarding career. Corporate Readiness Programme is a customized set of courses that links you on a journey of learning and they can become a successful and future ready professional.
                                    </p>
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-6">
                                        <p className="text-gray-700">
                                            Under this program we gather more than 30 industry-leading online conferences training courses, worth above NPR & talks, along with your degree to enhance job readiness.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Program Outline */}
                            <section 
                                ref={(el) => (sectionRefs.current["program-outline"] = el)}
                                id="program-outline"
                                className="mb-12 scroll-mt-24"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">
                                    Program Outline
                                </h2>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700 mb-4">
                                        The program is structured across three degree levels with specialized modules and common courses designed to provide comprehensive IT education.
                                    </p>
                                </div>
                            </section>

                            {/* Degree Level 1 */}
                            <section 
                                ref={(el) => (sectionRefs.current["degree-level-1"] = el)}
                                id="degree-level-1"
                                className="mb-12 scroll-mt-24"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">
                                    Degree Level 1
                                </h2>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700">
                                        Foundation courses covering basic principles of information technology, programming fundamentals, and essential computing concepts.
                                    </p>
                                </div>
                            </section>

                            {/* Continue with other sections following the same pattern */}
                            {/* Common Variables */}
                            <section 
                                ref={(el) => (sectionRefs.current["common-variables"] = el)}
                                id="common-variables"
                                className="mb-12 scroll-mt-24"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                                    Common Variables
                                </h3>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700">
                                        Core courses that are common across all IT specializations.
                                    </p>
                                </div>
                            </section>

                            {/* Specialized Modules 1 */}
                            <section 
                                ref={(el) => (sectionRefs.current["specialized-modules-1"] = el)}
                                id="specialized-modules-1"
                                className="mb-12 scroll-mt-24"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                                    Specialized Modules
                                </h3>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700">
                                        IoT-specific modules including sensor networks, embedded systems, and connected devices.
                                    </p>
                                </div>
                            </section>

                            {/* Degree Level 2 */}
                            <section 
                                ref={(el) => (sectionRefs.current["degree-level-2"] = el)}
                                id="degree-level-2"
                                className="mb-12 scroll-mt-24"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">
                                    Degree Level 2
                                </h2>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700">
                                        Intermediate level courses focusing on advanced programming, database management, and system analysis.
                                    </p>
                                </div>
                            </section>

                            {/* Add remaining sections similarly... */}
                            
                            {/* Entry Requirements */}
                            <section 
                                ref={(el) => (sectionRefs.current["entry-requirements"] = el)}
                                id="entry-requirements"
                                className="mb-12 scroll-mt-24"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">
                                    Entry Requirements
                                </h2>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700">
                                        Minimum requirements include completion of secondary education with mathematics and science subjects.
                                    </p>
                                </div>
                            </section>

                            {/* English Requirement */}
                            <section 
                                ref={(el) => (sectionRefs.current["english-requirement"] = el)}
                                id="english-requirement"
                                className="mb-12 scroll-mt-24"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b">
                                    English Requirement
                                </h2>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700">
                                        IELTS 6.0 or equivalent English proficiency test score for non-native speakers.
                                    </p>
                                </div>
                            </section>

                            {/* Mobile-only Table of Contents Button */}
                            <div className="lg:hidden mt-8">
                                <details className="bg-white border rounded-xl shadow-lg">
                                    <summary className="p-4 font-bold text-gray-900 cursor-pointer flex items-center justify-between">
                                        On this page
                                        <ChevronRight className="w-5 h-5 transform transition-transform" />
                                    </summary>
                                    <nav className="p-4 border-t">
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {tocItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => scrollToSection(item.id)}
                                                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                                                        activeSection === item.id
                                                            ? "bg-blue-50 text-blue-700 font-medium"
                                                            : "text-gray-600 hover:text-gray-900"
                                                    }`}
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    </nav>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;