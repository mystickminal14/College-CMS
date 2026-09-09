import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { campusBlocks } from "../data";
import SectionHeading from "./SectionHeading";

const CampusBlocks = () => {
  return (
    <section className="mb-16 md:mb-20">
      <SectionHeading
        title="Six Purpose-Oriented"
        highlightedText="Blocks"
        subtitle="Each block serves a distinct role in the student journey — from admission and orientation through to classroom learning, practical training, placement and alumni engagement."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campusBlocks.map((block, index) => (
          <motion.article
            key={block.name}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: index * 0.08,
            }}
            className="overflow-hidden border border-gray-200 shadow-lg group bg-linear-to-br from-white to-gray-50 rounded-2xl"
          >
            <div className="relative overflow-hidden h-52 bg-linear-to-br from-blue-50 to-gray-100">
              {block.image ? (
                <img
                  src={block.image}
                  alt={`${block.name} block at LBEF College`}
                  loading="lazy"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Building2 className="w-14 h-14 text-blue-600/40" />
                </div>
              )}
              <span className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full top-3 left-3 bg-black/55 backdrop-blur-sm">
                {block.name}
              </span>
            </div>

            <div className="p-5">
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                {block.name} Block
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                {block.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {block.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default CampusBlocks;
