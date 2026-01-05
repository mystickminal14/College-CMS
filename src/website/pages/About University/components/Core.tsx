import  { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import decoration from '../../../../assets/decoration.png';
import imageone from '../../../../assets/core/drparam.webp';
import imagetwo from '../../../../assets/core/prof.jpg';
import bg1 from '../../../../assets/decoration/AboutHero.jpg';
import { useNavigate } from 'react-router-dom';

const messages = [
  {
    id:3,
    name: "Datuk Paramjeet Singh",
    position: "CO-FOUNDER & CEO",
    institution: "APIIT Education Group",
    message:
      "Dear Students,\nWe welcome LBEF to the international community of the Asia Pacific University of Technology & Innovation (APU). Parents, prospective & current students will be pleased to note that over 11,000 students including international students from over 120 countries are currently....",
    image: imageone,
  },
  {
    id:4,
    name: "Prof. Dr. Ho Chin Kuan",
    position: "VICE CHANCELLOR",
    institution: "Asia Pacific University",
    message:
      "Dear Students,\nI would like to extend a warm welcome to students who are part of the APU – LBEF academic partnership. The APU – LBEF partnership which started in 2016 has produced around 300 graduates. Student centricity and uncompromising quality are at the heart...",
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
  const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const fadeRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };
  const navigate = useNavigate();

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
      <div className="absolute inset-0 bg-[#474AFF] opacity-65" />

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-white text-lg font-medium mb-2">Meet Our Leads</p>
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
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow (Mobile only) */}
          {canScrollLeft && (
            <motion.button
              onClick={() => scrollByAmount('left')}
              className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-8 h-8 text-gray-700" />
            </motion.button>
          )}

          {/* Right Arrow (Mobile only) */}
          {canScrollRight && (
            <motion.button
              onClick={() => scrollByAmount('right')}
              className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-8 h-8 text-gray-700" />
            </motion.button>
          )}

          {/* Cards */}
          <motion.div
            ref={scrollContainerRef}
            className="flex gap-12 p-8 overflow-x-auto scroll-smooth scrollbar-hide lg:overflow-x-visible lg:justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {messages.map((lead, index) => (
              <motion.div
                onClick={() => navigate(`/messages/${lead.id}`)}
                key={index}
                className="shrink-0 pl-10 w-80 relative md:w-130 bg-white rounded-2xl shadow-md transition-transform hover:scale-105 cursor-pointer"
                variants={index % 2 === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.07 }}
                drag={isMobile() ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
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
                <div className="pt-2 pl-6 pb-6 pr-6 text-gray-700 whitespace-pre-line">
                  {lead.message}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}