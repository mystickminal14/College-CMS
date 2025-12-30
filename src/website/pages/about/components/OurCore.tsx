import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import decoration from '../../../../assets/decoration.png';
import imageone from '../../../../assets/core/pankag.png';
import imagetwo from '../../../../assets/core/prakash.png';
import bg1 from '../../../../assets/decoration/AboutHero.jpg';

const messages = [
  {
    name: "Er. Pankaj Jalan",
    position: "Chairman",
    institution: "LBEF Group Of Institutions",
    message:
      "Dear Students,\nIt is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you are a large and diverse group, reflecting our wonderful regional character and diversity.",
    image: imageone,
  },
  {
    name: "Er. Prakash Kumar Kejriwal",
    position: "Executive Director",
    institution: "LBEF Group of Institutions",
    message:
      "Dear Students,\nWelcome to LBEF College - the First IT College of Nepal! We are excited about your interest in joining our esteemed institution. At LBEF, we are dedicated to offering an exceptional educational experience that prepares you for ...",
    image: imagetwo,
  },
];


export default function OurCore() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isMobile = () => window.innerWidth < 1024;

  const checkScrollability = () => {
    if (!scrollContainerRef.current || !isMobile()) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollByAmount = (dir: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: dir === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile() || !scrollContainerRef.current) return;

    const startX = e.pageX;
    const startScroll = scrollContainerRef.current.scrollLeft;

    const onMove = (ev: MouseEvent) => {
      scrollContainerRef.current!.scrollLeft =
        startScroll - (ev.pageX - startX) * 2;
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile()) return;

    checkScrollability();
    container.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);

    return () => {
      container.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-[#474AFF] opacity-80" />

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-white text-lg font-medium mb-2">
            Meet Our Leads
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Messages from{' '}
            <span className="relative inline-block text-white">
              Our Leads
              <img
                src={decoration}
                alt=""
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow (Mobile only) */}
          {canScrollLeft && (
            <button
              onClick={() => scrollByAmount('left')}
              className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg"
            >
              <ChevronLeft className="w-8 h-8 text-gray-700" />
            </button>
          )}

          {/* Right Arrow (Mobile only) */}
          {canScrollRight && (
            <button
              onClick={() => scrollByAmount('right')}
              className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg"
            >
              <ChevronRight className="w-8 h-8 text-gray-700" />
            </button>
          )}

          {/* Cards */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            className="    flex gap-12 p-8 overflow-x-auto scroll-smooth scrollbar-hide lg:overflow-x-visible lg:justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {messages.map((lead, index) => (
              <div
                key={index}
                className="shrink-0 pl-10 w-80 relative md:w-130 bg-white rounded-2xl shadow-md transition-transform hover:scale-105"
              >
                <div className="flex items-center gap-4 pt-6 pl-6 pb-2 pr-6">
                  <div className="w-20 h-20 rounded-full absolute top-5 -left-10 z-20 overflow-hidden border-4 border-[#474AFF]">
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
