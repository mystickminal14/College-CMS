import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import decoration from '../../../../assets/decoration.png';

const messages = [
  {
    name: "Er. Pankaj Jalan",
    position: "Chairman",
    institution: "LBEF Group Of Institutions",
    message:
      "Dear Students,\n\nIt is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you will engage in a vibrant group, reflecting our wonderful regional character and diversity.",
    image: "/path-to-pankaj-jalan.jpg", // Replace with actual image
  },
  {
    name: "Er. Pankaj Jalan",
    position: "Chairman",
    institution: "LBEF Group Of Institutions",
    message:
      "Dear Students,\n\nIt is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you will engage in a vibrant group, reflecting our wonderful regional character and diversity.",
    image: "/path-to-pankaj-jalan.jpg",
  },
  {
  
    name: "Er. Pankaj Jalan",
    position: "Chairman",
    institution: "LBEF Group Of Institutions",
    message:
      "Dear Students,\n\nIt is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you will engage in a vibrant group, reflecting our wonderful regional character and diversity.",
    image: "/path-to-pankaj-jalan.jpg",
  },
  {

    name: "Er. Pankaj Jalan",
    position: "Chairman",
    institution: "LBEF Group Of Institutions",
    message:
      "Dear Students,\n\nIt is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you will engage in a vibrant group, reflecting our wonderful regional character and diversity.",
    image: "/path-to-pankaj-jalan.jpg",
  },
  {

    name: "Er. Pankaj Jalan",
    position: "Chairman",
    institution: "LBEF Group Of Institutions",
    message:
      "Dear Students,\n\nIt is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you will engage in a vibrant group, reflecting our wonderful regional character and diversity.",
    image: "/path-to-pankaj-jalan.jpg",
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

  // Drag to scroll
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
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-blue-600 text-lg font-medium mb-2">Meet Our Leads</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Messages from{' '}
            <span className="relative inline-block">
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
            className="flex gap-15 overflow-x-auto  scrollbar-hide scroll-smooth px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {messages.map((lead, index) => (
              <div
                key={index}
                className="shrink-0 pl-10 w-80 relative md:w-96 bg-white rounded-2xl shadow-md transition-transform hover:scale-105"
              >
                <div className="flex items-center gap-4 p-6">
                  <div className="w-16 h-16 rounded-full absolute top-5 -left-5 z-20 overflow-hidden border-4 border-purple-600">
                    <img
                      src={lead.image}
                      alt={lead.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{lead.name}</h3>
                    <p className="text-sm text-gray-600">{lead.position}</p>
                    <p className="text-xs text-gray-500">{lead.institution}</p>
                  </div>
                </div>
                <div className="p-6 text-gray-700 leading-relaxed whitespace-pre-line">
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