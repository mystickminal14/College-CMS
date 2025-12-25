import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import decoration from '../../../../assets/decoration.png';
import { CourseSkeleton } from '../../programs/comp/CourseSkeleton';
import type { Courses } from '../../../../pages/courses/model/CourseModel';
import { IMAGE_URL } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import useGetAll from '../../programs/hook/useGetCourses';
import CourseMiniCard from '../../programs/comp/CourseCard';
import { FlipText } from '../utils/FlipText';
import { motion, useTransform, useScroll } from "framer-motion";


export function OurCourses() {
  const { data, isLoading } = useGetAll();
  const courses = data?.data || [];
  const hasCourses = !isLoading && courses.length > 0;
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleView = (course: Courses) => {
    const title = course.title.replace(/ /g, '-');
    navigate(`/students-life/${title}/${course.id}`, { state: { course } });
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-20 bg-[#0066FF0A]">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0E2A46] leading-tight mb-6 md:mb-0 text-center md:text-left">
            <span className="block text-[12px] sm:text-[14px] mb-4 font-normal uppercase tracking-wider opacity-80">
              Our Courses
            </span>

            <FlipText text="World Class Course" />{' '}
            <span className="relative text-[#474AFF] inline-block">
              <FlipText text="Students" />
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-full h-3"
              />
            </span>{' '}
            <FlipText text="Can" />

            <br className="hidden md:block" />

            <span className="mt-1 block md:inline">
              <FlipText text="Join With Us" />
            </span>
          </h2>

          <button
            className="flex items-center gap-2 px-6 py-3 border border-[#19213D] rounded-full hover:bg-gray-100 transition mt-4 md:mt-0"
            onClick={() => navigate('students-life/programs')}
          >
            Learn About Course
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="h-10" />

     {isLoading ? (
  <div className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex-none w-full max-w-sm">
        <CourseSkeleton />
      </div>
    ))}
  </div>
) : hasCourses ? (
  isMobile ? (
    <MobileCarousel courses={courses} onView={handleView} />
  ) : (
    <HorizontalScrollCarousel courses={courses} onView={handleView} />
  )
) : (
  <div className="w-full flex justify-center items-center py-16">
    <div className="text-center">
      <h3 className="text-xl font-semibold text-gray-700">
        No courses available right now
      </h3>
      <p className="text-gray-500 mt-2">
        Please check back later. New courses will be added soon.
      </p>
    </div>
  </div>
)}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}


const MobileCarousel = ({ courses, onView }: { courses: Courses[]; onView: (c: Courses) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [activePage, setActivePage] = useState(0);

  const getCardWidth = () => 240;
  const getCardsPerPage = () => 1;

  const check = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanLeft(scrollLeft > 10);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 10);

    const page = Math.round(scrollLeft / (getCardWidth() * getCardsPerPage()));
    setActivePage(page);
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => scrollRef.current?.scrollBy({ left: -240, behavior: 'smooth' })}
        disabled={!canLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${!canLeft ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => scrollRef.current?.scrollBy({ left: 240, behavior: 'smooth' })}
        disabled={!canRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${!canRight ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        ref={scrollRef}
        onScroll={check}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {courses.map(course => (
          <div key={course.id} className="flex-none w-full max-w-sm">
            <CourseMiniCard
              title={course.title}
              credits={course.credit}
              semester={course.semester}
              duration={course.duration}
              image={`${IMAGE_URL}${course.image}`}
              onView={() => onView(course)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-6 sm:mt-10 md:hidden">
        {[0, 1].map((page) => (
          <div
            key={page}
            onClick={() => {
              const amount = getCardWidth() * getCardsPerPage() * page;
              scrollRef.current?.scrollTo({ left: amount, behavior: 'smooth' });
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
  );
};

/* ================= DESKTOP ================= */

const HorizontalScrollCarousel = ({ courses, onView }: { courses: Courses[]; onView: (c: Courses) => void }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const cardWidth = 380;
  const gap = 24;
  const totalWidth = courses.length * (cardWidth + gap) - gap;
  const viewportWidth = window.innerWidth;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${totalWidth - viewportWidth + 240}px`]
  );

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-35 flex -mt-5 overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6">
          {courses.map(course => (
            <div key={course.id} className="w-96 shrink-0">
              <CourseMiniCard
                title={course.title}
                credits={course.credit}
                semester={course.semester}
                duration={course.duration}
                image={`${IMAGE_URL}${course.image}`}
                onView={() => onView(course)}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};