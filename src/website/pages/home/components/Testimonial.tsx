import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import decoration from '../../../../assets/decoration.png';
export function Testimonial() {
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

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-20 px-6 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            What our{" "}
            <span className="relative inline-block">
              students
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-full h-3"
              />
            </span>{" "}
            say
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-10">
            Lorem ipsum dolor sit amet consectetur in in dignissim vulputate lectus enim diam placerat praesent diam.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Thumbnail Gallery - Hidden on mobile/tablet, shown only on laptop+ (lg) */}
          <div className="hidden lg:block lg:col-span-4 space-y-6 order-2 lg:order-1">
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

                {/* Mobile/Tablet: Show large image above content */}
                <div className="lg:hidden mb-8">
                  <img
                    src={activeTestimonial.image}
                    alt={activeTestimonial.name}
                    className="w-full h-80 object-cover rounded-2xl mx-auto"
                  />
                </div>

                <div className="flex gap-10">
                  {/* Desktop/Laptop: Large image on the left */}
                  <div className="hidden lg:block shrink-0">
                    <img
                      src={activeTestimonial.image}
                      alt={activeTestimonial.name}
                      className="w-[20vw] h-[40vh] object-cover rounded-2xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-8 lg:mt-0">
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
  );
}