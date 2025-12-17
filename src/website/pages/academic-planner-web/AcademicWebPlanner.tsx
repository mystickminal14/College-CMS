import CustomBreadcrumb from "../../comp/bread-crump";
import bgImage from '../../../assets/OurTeam.jpg';
import image from '../../../assets/pcpsLogo.png';
import decoration from '../../../assets/decoration.png';
import useGetPlannerParents from "../../../pages/academic-planner/hooks/useGetPlannerParents";
import { IMAGE_URL } from "../../../constants";

const AcademicWebPlanner = () => {
    const { data, isLoading, error } = useGetPlannerParents();

    if (isLoading) return <p className="text-center py-20">Loading...</p>;
    if (error) return <p className="text-center py-20 text-red-500">Failed to load data</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <CustomBreadcrumb
                bgImage={bgImage}
                title="Academic Planner"
                objectPosition="50%_40%"
                breadcrumbs={[
                    { label: "Home" },
                    { label: "Students" },
                    { label: "Academic Planner" },
                ]}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
                <div className="max-w-8xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-blue-600 font-medium text-sm">Academic Programs & Curriculum</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                        <span className="text-gray-900">Academic</span>
                        <span className="relative inline-block ml-2">
                            <span className="text-blue-600 relative z-10">Planner</span>
                            <img
                                src={decoration}
                                alt="Decoration"
                                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
                            />
                        </span>
                    </h1>

                    <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Plan your academic journey with our comprehensive curriculum structure.
                        Explore different sessions and their corresponding academic plans.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
                {data?.data?.map((parent) => {
                    const sessionWords = parent?.session?.split(' ') || [];
                    const lastWord = sessionWords[sessionWords.length - 1] || '';
                    const otherWords = sessionWords.slice(0, -1).join(' ');

                    return (
                        <div key={parent.id} className="mb-16">
                            <div className="mb-10 text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {otherWords}{' '}
                                    <span className="relative inline-block">
                                        <span className="text-blue-600 relative z-10">{lastWord}</span>
                                        <img
                                            src={decoration}
                                            alt="Decoration"
                                            className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                                        />
                                    </span>
                                </h3>
                                <p className="text-gray-600 mt-2 max-w-3xl mx-auto md:mx-0">
                                    Academic plans and curriculum for {parent.session?.toLowerCase()}
                                </p>
                            </div>

                            {parent.children && parent.children.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {parent.children.map((child) => (
                                        <div
                                            key={child.id}
                                            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-1"
                                        >
                                            <div className="h-29 overflow-hidden relative">
                                                <img
                                                    src={image}
                                                    alt={child.course}
                                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {/* Optional overlay */}
                                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>

                                            <div className="p-5">
                                                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                                                    {child.course} - {child.semester} - {child.intake}
                                                </h3>

                                                <div className="grid grid-cols-2 gap-3 mb-4">
                                                    <div className="bg-blue-50 rounded-lg p-3">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="text-xs font-semibold text-blue-700">SEMESTER</span>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-800 mt-1">{child.semester}</p>
                                                    </div>

                                                    <div className="bg-green-50 rounded-lg p-3">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="text-xs font-semibold text-green-700">INTAKE CODE</span>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-800 mt-1">{child.intake}</p>
                                                    </div>
                                                </div>

                                                <button 
                                                            onClick={() => window.open(IMAGE_URL + child.file, "_blank")}
                                                
                                                className="w-full py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm group-hover:shadow-lg">
                                                    View Academic Plan
                                                </button>
                                            </div>

                                            <div className="h-1 bg-linear-to-r from-blue-400 to-blue-600"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No academic plans available for this session.</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AcademicWebPlanner;
