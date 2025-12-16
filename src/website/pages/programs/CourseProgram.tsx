import CustomBreadcrumb from "../../comp/bread-crump";
import bgImage from '../../../assets/OurTeam.jpg';
import decoration from '../../../assets/decoration.png';
import useGetAll from "./hook/useGetCourses";
import CourseMiniCard from "./comp/CourseCard";
import { IMAGE_URL } from "../../../constants";
import type { Courses } from "../../../pages/courses/model/CourseModel";
import { useNavigate } from "react-router-dom";
import { CourseSkeleton } from "./comp/CourseSkeleton";

const CourseProgram = () => {
    const { data, isLoading, isError } = useGetAll();

    const courses = data?.data || [];


    const navigate = useNavigate()
    const handleView = (course: Courses) => {
        const title = course.title.replace(/ /g, "-");
        navigate(`/students/${title}/${course.id}`, { state: { course } });
    };
    return (
        <div className="min-h-screen bg-gray-50">
            <CustomBreadcrumb
                bgImage={bgImage}
                title="Our Team"
                objectPosition="50%_40%"
                breadcrumbs={[
                    { label: "Home" },
                    { label: "About" },
                    { label: "Our Team" },
                ]}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-8xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-blue-600 font-medium text-sm">
                            Explore Our Academic Programs
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ">
                        <span className="text-gray-900">World Class </span>
                        <span className="relative inline-block">
                            <span className="text-blue-600 relative z-10"> Courses</span>
                            <img
                                src={decoration}
                                alt="Decoration"
                                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
                            />
                        </span>{" "}
                        <br />
                        <span className="text-gray-900">Students </span>
                        <span className="text-blue-600 relative z-10"> Can Join </span>
                        <span className="text-gray-900">With Us</span>
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-6  py-6">
                {isError ? (
                    <div className="text-center py-12">
                        <div className="text-red-500 text-lg font-semibold">
                            Failed to load courses. Please try again.
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl justify-items-center mx-auto">

                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <div key={`skeleton-${index}`} className="flex-none w-full max-w-sm">
                                        <CourseSkeleton />
                                    </div>
                                ))
                            ) : courses && courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <div key={`${course.id}-${index}`} className="flex-none w-full max-w-sm">
                                        <CourseMiniCard
                                            title={course.title}
                                            credits={course.credit}
                                            semester={course.semester}
                                            duration={course.duration}
                                            image={`${IMAGE_URL}${course.image}`}
                                            onView={() => handleView(course)}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-12">
                                    <div className="w-full flex justify-center items-center">
                                        <div className="text-center">
                                            <h3 className="text-xl font-semibold text-gray-700">No courses available right now</h3>
                                            <p className="text-gray-500 mt-2">
                                                Please check back later. New courses will be added soon.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CourseProgram;