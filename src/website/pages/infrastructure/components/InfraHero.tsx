import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useEnquiry } from "../../../../context/EnquiryContext";
import avRoom from "../../../../assets/infrastructure/av-room-01.webp";
import { campusBlocks, campusHero } from "../data";

/** Full-width dark hero: the campus building behind, the headline and a framed interior shot on the right. */
const InfraHero = () => {
  const { open } = useEnquiry();

  return (
    <section className="relative overflow-hidden bg-[#0B1220]">
      <img
        src={campusHero}
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 object-cover w-full h-full opacity-35"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#0B1220] via-[#0B1220]/90 to-[#0B1220]/50" />
      {/* Soft blue glow so the dark band doesn't read as flat black. */}
      <div className="absolute rounded-full pointer-events-none -top-40 -left-40 size-[32rem] bg-blue-600/25 blur-3xl" />

      <div className="container relative px-4 pt-16 pb-32 mx-auto sm:px-6 lg:px-8 md:pt-24 md:pb-40">
        <div className="grid items-center gap-12 mx-auto max-w-7xl lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium border rounded-full border-white/15 bg-white/5 text-blue-200 backdrop-blur">
              <MapPin className="w-3.5 h-3.5" />
              Kathmandu, Nepal · 7 ropani, one site
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Campus <span className="text-blue-400">Infrastructure</span>
            </h2>

            <p className="max-w-xl mt-6 text-base leading-relaxed sm:text-lg text-white/70">
              Six blocks named after Nepali flowers and birds, and more than
              50,000 sq. ft. of classrooms, labs and spaces students actually use.
            </p>

            <div className="flex flex-wrap gap-3 mt-9">
              <a
                href="#campus-blocks"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-500"
              >
                Explore the blocks
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => open()}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors border rounded-full border-white/25 hover:bg-white/10"
              >
                Arrange a campus visit
              </button>
            </div>

            <div className="flex flex-wrap mt-10 text-sm gap-x-3 gap-y-1 text-white/45">
              {campusBlocks.map((block, i) => (
                <span key={block.name} className="flex items-center gap-3">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-white/25" />}
                  {block.name}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:col-span-5 lg:block"
          >
            <div className="overflow-hidden shadow-2xl rounded-3xl ring-1 ring-white/10 aspect-[5/4]">
              <img
                src={avRoom}
                alt="Audio-visual room at LBEF College"
                loading="eager"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute flex items-center gap-4 p-4 pr-6 bg-white shadow-xl -left-10 bottom-10 rounded-2xl">
              <span className="grid text-xl font-bold text-white bg-blue-600 size-12 place-items-center rounded-xl">
                6
              </span>
              <span>
                <span className="block text-sm font-semibold text-[#0B1220]">Campus blocks</span>
                <span className="block text-xs text-gray-500">across one Kathmandu site</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfraHero;
