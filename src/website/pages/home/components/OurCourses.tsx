import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import decoration from '../../../../assets/decoration.png';
import { CourseSkeleton } from '../../programs/comp/CourseSkeleton';
import type { Courses } from '../../../../pages/courses/model/CourseModel';
import { IMAGE_URL } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import useGetAll from '../../programs/hook/useGetCourses';
import CourseMiniCard from '../../programs/comp/CourseCard';

export function OurCourses() {
  const { data, isLoading } = useGetAll();
  const courses = data?.data || [];
  const hasCourses = !isLoading && courses.length > 0;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const navigate = useNavigate();

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = getCardWidth() + 24; // width + gap
    const page = Math.round(scrollLeft / (cardWidth * getCardsPerPage()));
    setActivePage(page >= 1 ? 1 : 0);
  };

  const getCardWidth = () => {
    if (window.innerWidth >= 1024) return 360; // lg
    if (window.innerWidth >= 768) return 280; // md
    return 240; // sm/mobile
  };

  const getCardsPerPage = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const scrollLeftFn = () => {
    const amount = getCardWidth() * getCardsPerPage();
    scrollContainerRef.current?.scrollBy({ left: -amount, behavior: 'smooth' });
  };

  const scrollRightFn = () => {
    const amount = getCardWidth() * getCardsPerPage();
    scrollContainerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleView = (course: Courses) => {
    const title = course.title.replace(/ /g, '-');
    navigate(`/students-life/${title}/${course.id}`, { state: { course } });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    const startX = e.pageX;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    let isDragging = true;

    const move = (e: MouseEvent) => {
      if (!isDragging) return;
      const x = e.pageX;
      const walk = (x - startX) * 2;
      scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
    };

    const up = () => {
      isDragging = false;
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-20 bg-[#0066FF0A]">
      <div className="max-w-10xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12">
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold text-[#0E2A46] leading-tight mb-6 md:mb-0 text-center md:text-left">
            <span className="block text-[12px] sm:text-[14px] mb-4 font-normal uppercase tracking-wider opacity-80">
              Our Courses
            </span>

            World Class Course{' '}
            <span className="relative text-blue-600 inline-block">
              Student
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>{' '}
            Can

            <br className="hidden md:block" />

            <span className="mt-1 block md:inline">Join With Us.</span>
          </h2>

          <button className="flex items-center gap-2 px-6 py-3 border border-[#19213D] rounded-full hover:bg-gray-100 transition mt-4 md:mt-0">
            Learn About Course
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex-none w-full max-w-sm">
                <CourseSkeleton />
              </div>
            ))}
          </div>
        ) : hasCourses ? (
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeftFn}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${
                !canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRightFn}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${
                !canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrollable Cards */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScrollability}
              onMouseDown={handleMouseDown}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing pb-4"
              style={{ scrollbarWidth: 'none' }}
            >
              {courses.map((course, index) => (
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
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-6 sm:mt-10">
              {[0, 1].map((page) => (
                <div
                  key={page}
                  onClick={() => {
                    const amount = getCardWidth() * getCardsPerPage() * page;
                    scrollContainerRef.current?.scrollTo({ left: amount, behavior: 'smooth' });
                  }}
                  className={`transition-all duration-300 cursor-pointer ${
                    activePage === page
                      ? 'w-10 h-2 bg-blue-600 rounded-full'
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          // No Courses Message
          <div className="w-full flex justify-center items-center py-16">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700">No courses available right now</h3>
              <p className="text-gray-500 mt-2">
                Please check back later. New courses will be added soon.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
