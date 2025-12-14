
import inslightOne from "../../../../assets/inslightOne.png"
import inslightTwo from "../../../../assets/inslightTwo.png"
import inslightThree from "../../../../assets/inslightRight.png"
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function LatestInslight() {
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
  const scrollRef = useRef<HTMLDivElement>(null);
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

  return (
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
  )
}


