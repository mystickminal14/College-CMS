import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import decoration from "../../../../assets/decoration.webp";
import { IMAGE_URL } from "../../../../constants";
import useGetNews from "../../../../pages/news/hooks/useGetAllNews";
import { parseDate } from "../../../../utils/ParseDate";
import { motion } from 'framer-motion';

const RecentNews = () => {
  const { data, isLoading, isError } = useGetNews({
    page: 1,
    limit: 6,
  });

  const newsList = data?.data ?? [];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const getCardWidth = () => {
    if (window.innerWidth >= 1024) return 380;
    if (window.innerWidth >= 768) return 320;
    return 280;
  };

  const getCardsPerPage = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollLeftFn = () => {
    const amount = getCardWidth() * getCardsPerPage();
    scrollRef.current?.scrollBy({ left: -amount, behavior: "smooth" });
  };

  const scrollRightFn = () => {
    const amount = getCardWidth() * getCardsPerPage();
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    const startX = e.pageX;
    const scrollLeft = scrollRef.current.scrollLeft;
    let isDragging = true;

    const move = (e: MouseEvent) => {
      if (!isDragging) return;
      const x = e.pageX;
      const walk = (x - startX) * 2;
      scrollRef.current!.scrollLeft = scrollLeft - walk;
    };

    const up = () => {
      isDragging = false;
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 100 }} // start from below
          whileInView={{ opacity: 1, y: 0 }} // animate to position
          viewport={{ once: true, amount: 0.3 }} // trigger once when in view
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Recent{" "}
          <span className="relative inline-block text-[#474AFF]">
            News
            <motion.img
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.3 }}

              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 w-full h-3"
            />
          </span>
        </motion.h1>

        {isLoading && (
          <p className="text-center text-gray-500">Loading news...</p>
        )}

        {!isLoading && newsList?.length === 0 && (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No News available right now
            </h3>
            <p className="text-gray-500 mt-2">
              Please check back later. New News will be added soon.
            </p>
          </div>
        )}


        {!isLoading && !isError && newsList.length > 0 && (
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeftFn}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition ${!canScrollLeft
                ? "opacity-30 cursor-not-allowed"
                : "hover:scale-110"
                }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRightFn}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition ${!canScrollRight
                ? "opacity-30 cursor-not-allowed"
                : "hover:scale-110"
                }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrollable Cards */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              onMouseDown={handleMouseDown}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing pb-4"
            >
              {newsList.map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition"
                >
                  <img
                    src={
                      item.image
                        ? `${IMAGE_URL}${item.image}`
                        : "https://via.placeholder.com/400x300"
                    }
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-6">
                    <a href={item.link} target="_blank" >
                      <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600">
                        {item.title}
                      </h2>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                        {item.content}
                      </p>

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{item.source ?? "LBEF News"}</span>
                        <span>{item.publishedOn && parseDate(item.publishedOn)}</span>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Read More */}
        {/* <div className="flex justify-center mt-12">
          <button className="px-8 py-3 border-2 border-[#474AFF] text-[#474AFF] font-semibold rounded-full hover:bg-[#474AFF] hover:text-white transition"
            onClick={() => navigate('media/news-events')}>
            Read More
          </button>
        </div> */}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default RecentNews;
