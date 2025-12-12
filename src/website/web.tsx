import logo from "../assets/lbef_black.jpeg"
import butterfiles from "../assets/butterfiles.png"
import graduation from "../assets/graduations.jpg"
import arrow from "../assets/arrow.png"
import { useEffect, useRef, useState } from 'react';
import CourseMiniCard from "../components/courses/MiniCard";
import apu from "../assets/apu_logo.png"
import ranking from "../assets/university_ranking.png"
import { GraduationCap, Briefcase, Award, Users, ChevronLeft, ChevronRight, Play, CheckCircle, Video } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import inslightOne from "../assets/inslightOne.png"
import inslightTwo from "../assets/inslightTwo.png"
import inslightThree from "../assets/inslightRight.png"
import girlWithCup from "../assets/gril_with_cup.png"
import girlwithThinking from "../assets/girl_with_thinking.png"
import arrow_down from "../assets/arrow_down.png"
import arrow_up from "../assets/arrow_top.png"
import lbef_bufferfly from "../assets/pcpsLogo.png"
import { OurPartners } from "./components/Home/OurPartners";

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

  const images = [
    {
      id: 1,
      src: arrow_up,
      position: "top-left",
      height: "70px",
      width: "105px"

    },
    {
      id: 2,
      src: arrow_up,
      position: "left",
      width: "70px",
      height: "50px",

    }, {
      id: 3,
      src: arrow_down,
      position: "bottom-left",
      width: "95px",
      height: "65px",

    }
    , {
      id: 4,
      src: arrow_up,
      position: "top-right",
      height: "70px",
      width: "105px",
      flip: "horizontal"


    }
    , {
      id: 5,
      src: arrow_up,
      position: "right",
      width: "70px",
      height: "50px",
      flip: "horizontal"
    }
    , {
      id: 6,
      src: arrow_down,
      position: "bottom-right",
      width: "95px",
      height: "65px",
      rotate: "-40deg"
    }
  ]
  const features = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      topTitle: "100% ",
      title: "Internship Assured",
      position: "top-left",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      topTitle: "World Class ",
      title: "Degree",
      position: "top-right",
    },
    {
      icon: <Users className="w-6 h-6" />,
      topTitle: "Employment ",
      title: " Opportunities",
      position: "right",
    },
    {
      icon: <Award className="w-6 h-6" />,
      topTitle: "100% ",
      title: "Up to Scholarship",
      position: "bottom-right",
    },
    {
      icon: <Award className="w-6 h-6" />,
      topTitle: "100%  ",
      title: "Up to Scholarship",
      position: "bottom-left",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      topTitle: "100% ",
      title: "Internship Assured",
      position: "left",

    },
  ];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePage, setActivePage] = useState(0); // 0 = first 3, 1 = last 3
  const scrollRef = useRef<HTMLDivElement>(null);

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
  const testimonials = [
    {
      id: 1,
      name: "Pratik Tamang",
      batch: "Batch 2024",
      quote: "Unmatched education with personalized learning experiences",
      details: "The faculty here doesn't just teach—they mentor. From day one, I've had access to industry projects, one-on-one guidance, and a curriculum that actually prepares you for real-world challenges.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
    },
    {
      id: 2,
      name: "Aarati Shrestha",
      batch: "Batch 2023",
      quote: "Best decision of my academic life",
      details: "LBEF transformed how I see education. The blend of theoretical knowledge and practical exposure through internships made me job-ready even before graduation.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800"
    },
    {
      id: 3,
      name: "Roshan KC",
      batch: "Batch 2024",
      quote: "Supportive environment that pushes you to excel",
      details: "What I love most is the community. Seniors help juniors, teachers are approachable 24/7, and there's always someone to guide you through tough times.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800"
    },

  ];
  const insights = [
    {
      id: 1,
      title: "The Future of Branding in 2025",
      desc: "Exploring emerging trends in brand development.",
      image: inslightOne,
    },
    {
      id: 2,
      title: "Building Digital-First Brands",
      desc: "Strategies for success in the digital age.",
      image: inslightTwo,
    },
    {
      id: 3,
      title: "Sustainable Brand Design",
      desc: "Creating eco-conscious brand identities.",
      image: inslightThree,
    },
    {
      id: 4,
      title: "Minimalism in Modern UI",
      desc: "Why less is more in digital experiences.",
      image: inslightOne,
    },
    {
      id: 5,
      title: "The Rise of AI in Creativity",
      desc: "How artificial intelligence is shaping design.",
      image: inslightThree,
    },
  ];
  useEffect(() => {
    checkScrollability();
  }, []);

  //for the inslight scrollable cards
  const scrollRefInslight = useRef<HTMLDivElement>(null);
  const [canScrollLeftInslight, setCanScrollLeftInslight] = useState(false);
  const [canScrollRightInslight, setCanScrollRightInslight] = useState(true);
  const [activePageInslight, setActivePageInslight] = useState(0); // 0 = first 3, 1 = last 3
  const checkScrollInslight = () => {
    if (!scrollRefInslight.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRefInslight.current;
    setCanScrollLeftInslight(scrollLeft > 10);
    setCanScrollRightInslight(scrollLeft < scrollWidth - clientWidth - 10);
    // Detect which "page" is active (based on scroll position)
    const cardWidth = 300 + 24; // w-80 (320px) + gap-6 (24px)
    const scrollPosition = scrollLeft;
    const page = Math.round(scrollPosition / (cardWidth * 3));
    setActivePageInslight(page >= 1 ? 1 : 0); // Only 2 pages: 0 and 1

  };

  const scrollLeftInslight = () => {
    scrollRefInslight.current?.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRightInslight = () => {
    scrollRefInslight.current?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  // Drag to scroll
  const handleMouseDownInslight = (e: React.MouseEvent) => {
    if (!scrollRefInslight.current) return;
    const startX = e.pageX;
    const scrollLeft = scrollRefInslight.current.scrollLeft;
    let isDragging = true;

    const move = (e: MouseEvent) => {
      if (!isDragging) return;
      const x = e.pageX;
      const walk = (x - startX) * 2;
      scrollRef.current!.scrollLeft = scrollLeft - walk;
    };

    const up = () => {
      isDragging = false;
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
  ///testimonial slider
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];
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
                className="inline-flex items-center uppercase justify-center rounded-full border-2 border-[#00000057] bg-white px-12 py-4 text-[#050038] font-medium transition hover:bg-[#3040E5] hover:text-white hover:ease-in-out"
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
              <div className="relative flex items-center justify-center">
                {/* Ripple effect */}
                <span className="absolute w-20 h-20 rounded-full bg-white opacity-40 animate-[ripple_1s_ease-out_infinite]"></span>

                <div
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg relative"
                >
                  <a href="https://www.youtube.com/watch?v=eibpVkSHOqU" target="_blank" rel="noopener noreferrer">
                    <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
                  </a>
                </div>
              </div>


            </button>
            <a href="https://www.youtube.com/watch?v=eibpVkSHOqU" target="_blank" className="text-lg font-medium">watch now</a>
          </div>
        </div>
      </section >
      <section className="py-20 px-6 bg-linear-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center">

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Why Choose LBEF ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock your true potential and discover a world of opportunities<br />
            that align with your skills, interests, and aspirations
          </p>

          {/* Circular Layout */}
          <div className="relative my-50  flex justify-center items-center">
            {/* Outer Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 rounded-full border-4 border-blue-100 opacity-30"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full border-4 border-blue-100 opacity-20"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[600px] h-[600px] rounded-full border-4 border-blue-100 opacity-20"></div>
            </div>

            {/* Planet Orbit Animation */}
            <div
              className="absolute w-96 h-96"
              style={{
                animation: "orbit 2s linear infinite",
              }}
            >
              {/* Small Circle / Planet */}
              <div className="w-6 h-6 bg-blue-300 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 shadow-xl"></div>
            </div>
            <div
              className="absolute w-[600px] h-[600px]"
              style={{
                animation: "orbit 10s linear infinite",
              }}
            >
              {/* Small Circle / Planet */}
              <div className="w-6 h-6 bg-blue-300 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 shadow-xl"></div>
            </div>
            <div
              className="absolute w-[500px] h-[500px]"
              style={{
                animation: "orbit 5s linear infinite",
              }}
            >
              {/* Small Circle / Planet */}
              <div className="w-6 h-6 bg-blue-300 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 shadow-xl"></div>
            </div>


            {/* Center Logo */}
            <div className="flex justify-center items-center z-20 h-[25vh] w-[15vw] bg-white rounded-full shadow-2xl p-1 border border-gray-100">
              <img src={lbef_bufferfly} alt="" />
            </div>
            {images.map((feature, index) => {
              const positions = {
                "top-left": "top-10 left-10 md:-top-40 md:left-80",
                "top-right": "top-10 right-10 md:-top-40 md:right-80",
                "right": "top-25 right-0 md:right-60",
                "bottom-right": "bottom-10 right-10 md:-bottom-40 md:right-80",
                "bottom-left": "bottom-10 left-10 md:-bottom-40 md:left-80",
                "left": "top-25 left-0 md:left-60",
              };

              return (
                <div
                  key={index}
                  className={`absolute ${positions[feature.position as keyof typeof positions]}`}
                >
                  {/* Feature Image With Dynamic Size */}
                  <img
                    src={feature.src}
                    alt=""
                    style={{
                      width: feature.width,
                      height: feature.height,
                      transform: feature.flip === "horizontal"
                        ? "scaleX(-1)"            // horizontal flip
                        : feature.rotate          // rotate if rotate is defined
                          ? `rotate(${feature.rotate})`
                          : "none",
                    }}
                    className="object-contain"
                  />
                </div>
              );
            })}


            {/* Feature Cards with Curved Arrows */}
            {features.map((feature, index) => {
              const positions = {
                "top-left": "top-10 left-10 md:-top-30 md:left-20",
                "top-right": "top-10 right-10 md:-top-30 md:right-30",
                "right": "top-25  right-0 md:right-5",
                "bottom-right": "bottom-10 right-10 md:-bottom-30 md:right-15",
                "bottom-left": "bottom-10 left-10 md:-bottom-25 md:left-20",
                "left": "top-25  left-0 md:-left-5",
              };

              return (
                <div
                  key={index}
                  className={`absolute ${positions[feature.position as keyof typeof positions]}`}
                >
                  {/* Feature Card */}
                  <div className="bg-white rounded-3xl flex items-center  gap-3 shadow-xl border border-gray-200 px-6 py-4 min-w-48 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="text-sm md:text-base font-bold text-gray-800 whitespace-nowrap">
                      <p>{feature.topTitle}</p>
                      <p>{feature.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 lg:px-20 bg-[#0066FF0A]">
        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-40 items-center">

            {/* Left Side - Images + Floating Badges */}
            <div className="relative flex mb-45 justify-center lg:justify-end">

              {/* Main Student Image (Top) */}
              <div className="relative z-10">
                <div className="w-70 h-115 overflow-hidden shadow-2xl border-8 border-white" style={{
                  borderTopLeftRadius: "180px",
                  borderBottomRightRadius: "180px"
                }}>
                  <img
                    src={girlWithCup}
                    alt="Student learning"
                    className="w-full h-full object-cover transition-transform scale-135 object-top "
                  />
                </div>

                {/* BEST Students Badge */}
                <div className="absolute -bottom-35 -right-10 bg-white rounded-full shadow-xl px-8 py-4 flex items-center gap-5 border border-purple-100">
                  <div className="w-20 h-20 bg-purple-100  rounded-full flex items-center justify-center">
                    <Video />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">BEST</p>
                    <p className="text-2xl text-gray-600">Learning</p>
                  </div>
                </div>
              </div>

              {/* Bottom Student Image (Offset) */}
              <div className="absolute -bottom-50 right-60 ">
                <div className="w-80 h-105 rounded-3xl overflow-hidden shadow-2xl " style={{
                  borderTopLeftRadius: "200px",
                  borderBottomRightRadius: "200px"
                }}>
                  <img
                    src={girlwithThinking}
                    alt="Happy student"
                    className="w-full h-full object-cover transition-transform scale-125"
                  />
                </div>

                {/* BEST Learning Badge */}
                <div className="absolute -top-35 -left-10 bg-white rounded-full shadow-xl px-8 py-4 flex items-center gap-5 border border-blue-100">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">BEST</p>
                    <p className="text-2xl text-gray-600">Students</p>
                  </div>
                </div>
              </div>

              {/* Background Decorative Circle */}
              <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl -z-10"></div>
            </div>

            {/* Right Side - Content */}
            <div className="text-center lg:text-left ">
              {/* Badge */}
              <span className="inline-block px-6 py-2 bg-[#F5F2FF] text-[#3040E5] text-sm font-semibold rounded-full mb-6">
                Join LBEF
              </span>

              {/* Main Heading */}
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Join as a Student–<br />
                <span className="text-blue-600">Start Your Learning</span><br />
                Journey Today!
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Become a part of our vibrant learning community and grow your skills with expert-led courses.
                As a student, you'll access interactive lessons, connect with global learners, and build
                knowledge that supports your academic and professional goals.
              </p>

              {/* Features List with Checkmarks */}
              <div className="flex gap-10">
                <div className="space-y-4 mb-10">
                  {[
                    "Flexible Learning Schedule",
                    "Access to Expert Instructors",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 text-gray-700">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-blue-600" strokeWidth={3} />
                      </div>
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 mb-10">
                  {[
                    "Career-Focused Courses",
                    "Competitive Environment"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 text-gray-700">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-blue-600" strokeWidth={3} />
                      </div>
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Join as Student
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* testimonial section */}
      <section className="py-20 px-6 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              What our students say
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet consectetur in in dignissim vulputate lectus enim diam placerat praesent diam.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Thumbnail Gallery */}
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-pointer transition-all duration-300 ${activeIndex === index ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-70'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden border-4 border-white">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Active Testimonial Card */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.1, type: "spring", stiffness: 100 }}
                  className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 relative overflow-hidden"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-8 left-8 text-9xl text-gray-100 font-bold leading-none select-none">
                    “
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <img src={activeTestimonial.image} alt={activeTestimonial.name} className="w-350 h-130 object-cover rounded-2xl" />
                    </div>
                    {/* Content */}
                    <div className="relative z-10 mt-8">
                      <h3 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight mb-6">
                        “{activeTestimonial.quote}”
                      </h3>
                      <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                        {activeTestimonial.details}
                      </p>

                      {/* Student Info */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900">
                            {activeTestimonial.name}
                          </h4>
                          <p className="text-blue-600 font-medium">
                            {activeTestimonial.batch}
                          </p>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={prevTestimonial}
                            className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={nextTestimonial}
                            className="w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center justify-center"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      {/* 
      //latest insight section */}
      <section className="py-10 px-6 lg:px-20 bg-[#0066FF0A]">
        <div className="max-w-8xl mx-auto">
          {/* Heading */}
          <h2 className="text-center text-5xl md:text-6xl font-bold text-gray-900 mb-16">
            Latest Insights
          </h2>

          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeftInslight}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${!canScrollLeftInslight ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
                }`}
              disabled={!canScrollLeftInslight}
            >
              <ChevronLeft className="w-7 h-7 text-blue-600" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRightInslight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${!canScrollRightInslight ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
                }`}
              disabled={!canScrollRightInslight}
            >
              <ChevronRight className="w-7 h-7 text-blue-600" />
            </button>

            {/* Scrollable Cards */}
            <div
              ref={scrollRefInslight}
              onScroll={checkScrollInslight}
              onMouseDown={handleMouseDownInslight}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none' }}
            >
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className="flex-none w-120 snap-center group pb-10"
                >
                  <div className="bg-white rounded-4xl 
                shadow-[0_8px_16px_rgba(0,0,0,0.10)]
                 transition-all">


                    <div className="h-56 overflow-hidden rounded-t-4xl">
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {insight.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {insight.desc}
                      </p>
                      <a
                        href="#"
                        className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group"
                      >
                        Read More
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-10">
              {[0, 1].map((page) => (
                <div
                  key={page}
                  onClick={() => {
                    scrollRefInslight.current?.scrollTo({
                      left: page * 960 * 1.02, // ~3 cards width
                      behavior: 'smooth'
                    });
                  }}
                  className={`transition-all duration-300 cursor-pointer ${activePageInslight === page
                    ? 'w-10 h-2 bg-blue-600 rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hide scrollbar */}
        <style >{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
       `}</style>
      </section>
      
      <OurPartners />
    </>
  )
}