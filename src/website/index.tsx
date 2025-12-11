import logo from "../assets/lbef_white.png"
import butterfiles from "../assets/butterfiles.png"
import graduation from "../assets/graduations.jpg"
import arrow from "../assets/arrow.png"
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, LoaderIcon, Play, } from 'lucide-react';
import CourseMiniCard from "../components/courses/MiniCard";
import apu from "../assets/apu_logo.png"
import ranking from "../assets/university_ranking.png"

export function HomePage() {
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
    }, {
      id: 6,
      title: "Natural Language Processing Fundamentals",
      credits: 105,
      duration: " 3 year",
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
  const [activePage, setActivePage] = useState(0); // 0 = first 3, 1 = last 3

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Detect which "page" is active (based on scroll position)
    const cardWidth = 320 + 24; // w-80 (320px) + gap-6 (24px)
    const scrollPosition = scrollLeft;
    const page = Math.round(scrollPosition / (cardWidth * 3));

    setActivePage(page >= 1 ? 1 : 0); // Only 2 pages: 0 and 1
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -960, behavior: 'smooth' }); // 3 cards
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 960, behavior: 'smooth' }); // 3 cards
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
  }, []);

  return (
    <>
      <section className="flex items-center justify-around pt-6">
        <div style={{ width: "150px" }}><img src={logo} alt="LBEF Logo" className="object-cover" /></div>
        <nav className="uppercase font-inter">
          <ul className="flex gap-15 text-[0.85vw] font-medium" style={{ color: "#050038" }} >
            <li>home</li>
            <li className=" flex gap-1 items-center">about<i className="fa-solid fa-angle-down"></i></li>
            <li className=" flex gap-1 items-center">students<i className="fa-solid fa-angle-down"></i></li>
            <li className=" flex gap-1 items-center">admission<i className="fa-solid fa-angle-down"></i></li>
            <li className=" flex gap-1 items-center">media<i className="fa-solid fa-angle-down"></i></li>
            <li className=" flex gap-1 items-center">Blogs<i className="fa-solid fa-angle-down"></i></li>
            <li>ugc</li>
          </ul>
        </nav>
        <div className="">
          <a href="#" style={{ backgroundColor: "#3040E5" }} className="capitalize text-[1vw] text-white px-4 py-2 rounded-2xl">Enroll Now</a>
        </div>
      </section>
      <section className=" bg-white flex justify-between p-10 pt-15">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
          <div className="h-0.5 bg-[#0F183F] w-40"></div>
        </div>
        <div className="font-bold text-[5.5vw]">
          <span className="relative">Welcome
            <span className="absolute text-[1vw] left-0 font-normal">The First IT College of Nepal</span>
          </span>
          <span className="relative"> to {""}
            <span className="absolute text-[1vw] left-0 top-[0.5vh] font-normal">Your Future</span>
          </span>
          <span
            className="text-white pl-3 pr-3 inline-block relative"
            style={{
              backgroundColor: "#3040E5",
              borderTopRightRadius: "50px",
              borderBottomLeftRadius: "50px",
              padding: "0 12px",
            }}
          >
            <span className="absolute h-[2vh] w-[2vw] left-[7vw] top-[1.5vh]">
              <img src={butterfiles} alt="Butterflies" />
            </span>
            LBEF
          </span>
          {" "}
          <span className="relative">
            College
            <span className="absolute text-[1vw] left-0 top-[11vh] font-normal">in IT</span>
          </span>
        </div>
        <div className="flex items-center">
          <div className="h-0.5 bg-[#0F183F] w-40"></div>
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
        </div>
      </section>
      <section className="w-full h-[20vw] relative overflow-hidden">
        <img
          src={graduation}
          alt="Graduation"
          className="w-full h-full object-cover object-center"
        />
      </section>

      <section className="bg-white py-16 lg:px-20 flex relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 ">
          {/* Left: Curved Dotted Arrow */}
          <div className="absolute left-[-5vw]">
            <img src={arrow} alt="Curved Dotted Arrow" width="450vw" />
          </div>

          {/* Right: Text + Buttons */}
          <div className="text-center lg:text-left flex-1 relative">
            <p className="text-lg text-center lg:text-xl text-[#19213DB2] leading-relaxed max-w-1xl">
              Together with our top-notch faculty, we <br /> provide a nurturing environment to help students evolve into{" "}
              leaders who think boldly, make <br /> effective choices and are well-equipped with{" "}
              futuristic <br /> mindset and skills.
            </p>

            <div className="mt-10 flex  flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex uppercase items-center justify-center rounded-full bg-[#3040E5] px-12 py-4 text-white font-medium transition hover:bg-[#2535c7] shadow-lg"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="inline-flex items-center uppercase justify-center rounded-full border-2 border-[#00000057] bg-white px-12 py-4 text-[#050038] font-medium transition hover:bg-[#3040E5] hover:text-white"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 px-4 lg:px-20 bg-[#0066FF0A]">
        <div className="max-w-10xl ">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0E2A46] leading-tight">
              <span className="block text-[14px] mb-6 font-normal uppercase tracking-wider opacity-80">
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
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
                }`}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
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
              {[...courses].map((course, index) => (
                <div key={`${course.id}-${index}`} className="flex-none h-92 w-90">
                  <CourseMiniCard
                    title={course.title}
                    credits={course.credits}
                    duration={course.duration}

                  />
                </div>
              ))}
            </div>

            {/* Dots Indicator */}

            <div className="flex justify-center gap-3 mt-10">
              {[0, 1].map((page) => (
                <div
                  key={page}
                  onClick={() => {
                    scrollContainerRef.current?.scrollTo({
                      left: page * 960 * 1.02, // ~3 cards width
                      behavior: 'smooth'
                    });
                  }}
                  className={`transition-all duration-300 cursor-pointer ${activePage === page
                    ? 'w-10 h-2 bg-blue-600 rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                    }`}
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
      <section className="relative py-25 px-6 lg:px-20 bg-white overflow-hidden">
        {/* Background Decorative Shapes */}
        <div className="absolute top-[5vh] left-[10vw] w-58 h-74 bg-gray-200 rounded-3xl -rotate-15 opacity-70 hidden lg:block"></div>
        <div className="absolute bottom-[10vh] right-[6vw] w-58 h-74 bg-gray-200 rounded-3xl rotate-15 opacity-60 hidden lg:block"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-block px-8 py-2 text-[25px] bg-[#3040E5] text-white font-bold rounded-full">
              Our University
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-10">
            <span className="text-[#3040E5]">Gateway </span>To Personal
            <br />
            <span className="text-gray-900">And Professional <span className="text-[#3040E5]">Growth</span></span>
          </h1>

          {/* Description */}
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-lg md:text-xl text-[#4D5756] leading-relaxed mb-12">
              The Asia Pacific University of Technology & Innovation (APU) is amongst Malaysia’s Premier Private Universities, and is where a unique fusion of technology, innovation and creativity works effectively towards transforming students into highly competent, employable and future-proof professionals. APU has earned an enviable reputation as an award-winning University through its achievements in winning a host of <span className="underline">over 400 prestigious awards at local and international levels.</span>
            </p>
          </div>

          {/* Logos & Rankings */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16">
            {/* APU Logo + Name */}
            <div className="flex items-center gap-4">
              <img
                src={apu}
                alt="APU Logo"
                className="h-20 w-auto"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-20 bg-gray-300"></div>

            {/* Rankings */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <img
                  src={ranking}
                  alt="QS 5 Star Rating"
                  className="h-16 mx-auto mb-2"
                />

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('src/assets/youtube_background.png')`,
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#000538AB]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-[70vw] flex justify-between px-6 text-white">
          <div className="flex flex-col justify-start">
            <p className="text-[18px] font-medium mb-4 tracking-wider opacity-90">
              Join Our New Session
            </p>

            {/* Main Title */}
            <h1 className="text-[55px] font-bold leading-tight mb-6">
              <span className="block">25+ Years of Excellence</span>
              <span className="block mt-2">
                LBEE Campus
              </span>
            </h1>
            <div className=" w-[250px] group relative px-10 py-5 bg-[#3040E5] hover:bg-[#3040E5] text-white font-medium text-lg rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-between cursor-pointer">
              Join With Us
              <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform text-[20px]"></i>
            </div>
          </div>

          <div className="flex flex-col gap-6 justify-center items-center mt-10">
            <button className="group flex items-center gap-4 px-8 py-5 ">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-full  flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
                  <span className="rounded-full h-100 w-100 border-red-600  absolute -bottom-10"></span>
                </div>
              </div>
            </button>
            <a href="https://www.youtube.com/watch?v=eibpVkSHOqU" target="_blank" className="text-lg font-medium">watch now</a>
            <div className="absolute top-50 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <LoaderIcon className="w-12 h-12 text-white/30 animate-pulse" />
            </div>
          </div>
        </div>
      </section >
    </>
  )
}