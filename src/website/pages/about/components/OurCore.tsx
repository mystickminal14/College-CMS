import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import decoration from '../../../../assets/decoration.png';
import imageone from '../../../../assets/core/pankag.png'
import imagetwo from '../../../../assets/core/prakash.png'
import imagethree from '../../../../assets/core/Datuk Paramjeet Singh.png'
import imagefour from '../../../../assets/core/Prof. Dr. Ho Chin Kuan.png'
import bg1 from '../../../../assets/decoration/background.png';



const messages = [
  {
    name: "Er. Pankaj Jalan",
    position: "Chairman",
    institution: "LBEF Group Of Institutions",
    message:
      "Dear Students,\nIt is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you are a large and diverse group. reflecting our wonderful regional character and diversity.",
    image: imageone, // Replace with actual image
  },
  {
    name: "Er. Prakash Kumar Kejriwal",
    position: "Executive Director",
    institution: "LBEF Group of Institutions",
    message:
      "Dear Students,\nWelcome to LBEF College -  the First IT College of Nepal!. We are excited about your interest in joining our esteemed institution. At LBEF, we are dedicated to offering an exceptional educational experience that prepares you for ...",
    image: imagetwo,
  },
  {

    name: "Datuk Paramjeet Singh",
    position: "CO-FOUNDER & CEO",
    institution: "APIIT Education Group",
    message:
      "Dear Students,\nWe welcome LBEF to the international community of the Asia Pacific University of Technology & Innovation (APU). Parents, prospective & current students will be pleased to note that over 11,000 students including international students from over 120 countries are currently....",
    image: imagethree,
  },
  {

    name: "Prof. Dr. Ho Chin Kuan",
    position: "VICE CHANCELLOR",
    institution: "Asia Pacific University",
    message:
      "Dear Students,\nI would like to extend a warm welcome to students who are part of the APU – LBEF academic partnership. The APU – LBEF partnership which started in 2016 has produced around 300 graduates. Student centricity and uncompromising quality are at the heart...",
    image: imagefour,
  },
  // Add more if needed
];

export default function OurCore() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const getScrollAmount = () => {
    if (!scrollContainerRef.current) return 300;
    return window.innerWidth >= 1024 ? 380 : window.innerWidth >= 768 ? 320 : 280;
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    const startX = e.pageX;
    const scrollLeftStart = scrollContainerRef.current.scrollLeft;
    let isDragging = true;

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const x = e.pageX;
      const walk = (x - startX) * 2; // Multiply by 2 for faster scroll
      scrollContainerRef.current!.scrollLeft = scrollLeftStart - walk;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollability();
    container.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);

    return () => {
      container.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-20" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-blue-600 text-lg font-medium mb-2">Meet Our Leads</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Messages from{' '}
            <span className="relative inline-block text-[#474AFF] ">
              Our Leads
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>{' '}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg transition-all ${canScrollLeft
              ? 'opacity-100 cursor-pointer hover:bg-gray-100'
              : 'opacity-0 cursor-default'
              }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg transition-all ${canScrollRight
              ? 'opacity-100 cursor-pointer hover:bg-gray-100'
              : 'opacity-0 cursor-default'
              }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-8 h-8 text-gray-700" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            className="flex gap-12 overflow-x-auto   scrollbar-hide scroll-smooth p-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {messages.map((lead, index) => (
              <div
                key={index}
                className="shrink-0 pl-10 w-80 relative md:w-96 bg-white rounded-2xl shadow-md transition-transform hover:scale-105"
              >
                <div className="flex items-center gap-4 pt-6 pl-6 pb-2 pr-6">
                  <div className="w-20 h-20 rounded-full absolute top-5 -left-5 z-20 overflow-hidden border-4 border-[#474AFF]">
                    <img
                      src={lead.image}
                      alt={lead.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{lead.name}</h3>
                    <p className="text-lg text-gray-600">{lead.position}</p>
                    <p className="text-sm text-gray-500">{lead.institution}</p>
                  </div>
                </div>
                <div className="pt-2 pl-6 pb-6 pr-6 text-gray-700  whitespace-pre-line">
                  {lead.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}