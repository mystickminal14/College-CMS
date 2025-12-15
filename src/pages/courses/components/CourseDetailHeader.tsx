import {
    Award,
    BookOpen,
    Calendar,
    Clock,
    GraduationCap,
} from "lucide-react";
import type { Courses } from "../model/CourseModel";
import { IMAGE_URL } from "../../../constants";

interface CourseHeaderProps {
    course: Courses;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
    return (
        <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
<div className="flex flex-col-reverse lg:flex-row gap-3 justify-center">

                    {/* LEFT */}
                    <div className="lg:w-1/2">
                        <div className="mb-8">
                            <div className="inline-block bg-linear-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                                {course.degree.toUpperCase()}'S DEGREE              </div>

                            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug text-center md:text-left">
                                <span className="text-blue-700">{course.prefix}.</span>{" "}
                                <span className="text-gray-800">{course.title}</span>
                            </h1>

                            <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-indigo-600 mt-6 rounded-full" />
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Shift</p>
                                    <p>{course.shift === "BOTH" ? "Morning/Evening" : course.shift.toLowerCase()}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Duration</p>
                                    <p>{course.duration}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Semester</p>
                                    <p>{course.semester}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Credits</p>
                                    <p>{course.credit}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 sm:col-span-2">
                                <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Degree Awarded By</p>
                                    <p>Asia Pacific University of Technology & Innovation</p>
                                </div>
                            </div>
                        </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-8">
                            {/* Class Timing Block */}
                            <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <Clock className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Class Timing</h3>
                                        <p className="text-lg font-semibold text-blue-700">6:30AM - 8:30AM</p>
                                        <p className="text-sm text-gray-600 mt-1">Sunday - Friday</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tutorials Block */}
                            <div className="bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-lg">
                                        <BookOpen className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Tutorials</h3>
                                        <p className="text-lg font-semibold text-emerald-700">8:30AM - 9:30AM</p>
                                        <p className="text-sm text-gray-600 mt-1">Sunday - Friday</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg w-full md:w-auto">
                                Apply for Scholarship →
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/2 flex justify-center"> <div className="w-full max-w-lg"> <div className="bg-white rounded-2xl shadow-xl overflow-hidden"> <img src={IMAGE_URL + course.image} alt="Course Preview" className="w-full h-80 md:h-[420px] lg:h-[520px] object-cover" /> </div> </div> </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;
