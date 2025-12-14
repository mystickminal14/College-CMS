import { useEffect, useRef, useState } from 'react';
import CourseMiniCard from "../../../../components/courses/MiniCard";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function OurCourses() {
  const courses = [
    {
      id: 1,
      title: "Advanced Machine Learning & Deep Neural Networks",
      credits: 123,
      duration: "3 years",
      instructor: "Dr. Sarah Chen",
      semester: "Fall 2025",
      enrolled: 89,
      capacity: 120,
      status: "active" as const,
    },
    {
      id: 2,
      title: "Data Science for Business Intelligence",
      credits: 98,
      duration: "2 years",
      instructor: "Prof. Michael Roberts",
      semester: "Spring 2025",
      enrolled: 110,
      capacity: 110,
      status: "inactive" as const,
    },
    {
      id: 3,
      title: "AI Ethics and Responsible Innovation",
      credits: 75,
      duration: "1 year",
      instructor: "Dr. Aisha Khan",
      semester: "Summer 2025",
      enrolled: 45,
      capacity: 80,
      status: "active" as const,
    },
    {
      id: 4,
      title: "Big Data Analytics with Apache Spark",
      credits: 110,
      duration: "2 years",
      instructor: "Prof. James Liu",
      semester: "Fall 2025",
      enrolled: 92,
      capacity: 100,
      status: "pending" as const,
    },
    {
      id: 5,
      title: "Natural Language Processing Fundamentals",
      credits: 105,
      instructor: "Dr. Elena Martinez",
      semester: "Spring 2025",
      enrolled: 78,
      capacity: 90,
      status: "active" as const,
    },
    {
      id: 6,
      title: "Natural Language Processing Fundamentals",
      credits: 105,
      duration: "3 years",
      instructor: "Dr. Elena Martinez",
      semester: "Spring 2025",
      enrolled: 78,
      capacity: 90,
      status: "active" as const,
    },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePage, setActivePage] = useState(0);

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
  });

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-20 bg-[#0066FF0A]">
      <div className="max-w-10xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0E2A46] leading-tight mb-6 md:mb-0">
            <span className="block text-[12px] sm:text-[14px] mb-4 font-normal uppercase tracking-wider opacity-80">
              Our Courses
            </span>
            World Class Course Student Can<br />
            <span>Join With Us.</span>
          </h2>
          <button className="hidden md:flex items-center gap-2 px-6 py-3 border border-[#19213D] rounded-full hover:bg-gray-100 transition">
            Learn About Course
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeftFn}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRightFn}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
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
              <div key={`${course.id}-${index}`} className="flex-none w-[240px] sm:w-[280px] md:w-[360px]">
                <CourseMiniCard
                  title={course.title}
                  credits={course.credits}
                  duration={course.duration}
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
                className={`transition-all duration-300 cursor-pointer ${activePage === page
                  ? 'w-10 h-2 bg-blue-600 rounded-full'
                  : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
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
