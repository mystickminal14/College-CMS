import { useState } from 'react';
import { IMAGE_URL } from "../../../constants";
import useGetHolidays from '../../../pages/holiday/hooks/useGetAll';
import type { HolidayType } from '../../../pages/holiday/model/HolidayModel';
import decoration from '../../../assets/decoration.png';

const HolidayWebPlanner = () => {
    const { data, isLoading } = useGetHolidays();
    const [activeTab, setActiveTab] = useState<HolidayType>('ADMINISTRATIVE');

    const SkeletonLoader = () => (
        <div className="animate-pulse space-y-8">
            <div className="flex justify-center">
                <div className="inline-flex rounded-xl bg-gray-100 p-1">
                    <div className="w-40 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="w-40 h-12 bg-gray-200 rounded-lg ml-2"></div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="bg-gray-200 rounded-2xl w-full max-w-4xl aspect-4/3"></div>
            </div>
        </div>
    );

    const administrativeHoliday = data?.data?.find(
        (holiday: any) => holiday.type === 'ADMINISTRATIVE'
    );
    const academicHoliday = data?.data?.find(
        (holiday: any) => holiday.type === 'ACADEMIC'
    );

    const currentHoliday =
        activeTab === 'ADMINISTRATIVE'
            ? administrativeHoliday
            : academicHoliday;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto  sm:px-6 lg:px-8 py-8 md:py-14 text-center">
                <div className="max-w-8xl mx-auto">
                    <div className="inline-flex items-center justify-center gap-2 mb-6 px-0 sm:px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-blue-600 font-medium text-sm">
                            Holiday Planner
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                        <span className="text-gray-900">Academic & </span>
                        <span className="relative inline-block sm:ml-2">
                            <span className="text-blue-600 relative z-10">
                                Administrative
                            </span>
                            <img
                                src={decoration}
                                alt="Decoration"
                                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-3"
                            />
                        </span>
                        <br />
                        <span> Holidays</span>
                    </h1>

                    <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Plan your academic year with our comprehensive holiday
                        schedule. Stay updated with all administrative and
                        academic holidays.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-16 lg:px-16 mb-12">
                <div className="flex justify-center">
                    <div className="inline-flex rounded-xl bg-gray-100 p-1">
                        <button
                            onClick={() => setActiveTab('ADMINISTRATIVE')}
                            className={`px-8 py-3 cursor-pointer rounded-lg font-semibold transition-all duration-300 ${
                                activeTab === 'ADMINISTRATIVE'
                                    ? 'bg-white text-blue-600 shadow-lg'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Administrative Holidays
                        </button>

                        <button
                            onClick={() => setActiveTab('ACADEMIC')}
                            className={`px-8 py-3 cursor-pointer rounded-lg font-semibold transition-all duration-300 ${
                                activeTab === 'ACADEMIC'
                                    ? 'bg-white text-blue-600 shadow-lg'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Academic Holidays
                        </button>
                    </div>
                </div>

              
            </div>

            <div className="container mx-auto px-4 sm:px-16 lg:px-16 pb-12 md:pb-20">
                {isLoading ? (
                    <SkeletonLoader />
                ) : currentHoliday ? (
                    <div className="space-y-12">
                        {/* IMAGE FIXED HERE */}
                        <div className="flex justify-center">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 w-full max-w-3xl">
                                <div className="bg-gray-100 w-full">
                                    <img
                                        src={IMAGE_URL + currentHoliday.image}
                                        alt="Holiday Schedule"
                                        className="
                                            w-full
                                            h-auto
                                            object-contain
                                            rounded-lg
                                            block
                                            sm:max-w-3xl
                                            sm:mx-auto
                                        "
                                    />
                                </div>

                              <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 to-transparent">
                  <div className="flex justify-between items-center">
                    <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold">
                      {currentHoliday.type}
                    </span>
                  
                  </div>
                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() =>
                                    window.open(
                                        IMAGE_URL + currentHoliday.image,
                                        "_blank"
                                    )
                                }
                                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                            >
                                View Full Schedule
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-semibold text-gray-700">
                            No holiday available
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HolidayWebPlanner;
