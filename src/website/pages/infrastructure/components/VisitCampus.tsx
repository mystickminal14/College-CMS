import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Images, MapPin } from "lucide-react";
import { useEnquiry } from "../../../../context/EnquiryContext";
import corridor from "../../../../assets/infrastructure/corridor-02.webp";

const VisitCampus = () => {
  const { open } = useEnquiry();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      className="mb-16 overflow-hidden md:mb-20 rounded-3xl bg-[#0B1220]"
    >
      <div className="grid md:grid-cols-2">
        <div className="p-7 sm:p-10 md:p-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-300">
            <MapPin className="w-3.5 h-3.5" />
            Come and see it
          </span>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
            Photographs only go so far.
          </h2>
          <p className="max-w-md mt-4 text-[15px] leading-relaxed text-white/65">
            Walk the six blocks, sit in a lecture hall and meet the people who
            teach here. Tell us when suits you and the admissions team will set
            it up.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              type="button"
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
            >
              Arrange a campus visit
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/media/photo-gallery"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-colors border rounded-full border-white/25 hover:bg-white/10"
            >
              <Images className="w-4 h-4" />
              More photographs
            </Link>
          </div>
        </div>

        <div className="relative min-h-[14rem] md:min-h-full">
          <img
            src={corridor}
            alt="Corridor connecting classrooms at LBEF College"
            loading="lazy"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/30 to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/70 to-transparent md:hidden" />
        </div>
      </div>
    </motion.section>
  );
};

export default VisitCampus;
