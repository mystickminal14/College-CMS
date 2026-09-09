import { motion } from "framer-motion";
import { glanceGroups } from "../data";
import SectionHeading from "./SectionHeading";

const CampusLedger = () => {
  return (
    <section className="mb-20 md:mb-28 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="bg-[#0B1220] px-5 py-14 sm:px-8 md:px-12 md:py-20 sm:rounded-3xl">
        <SectionHeading
          tone="dark"
          eyebrow="The full count"
          title="The campus, room by"
          highlightedText="room"
          subtitle="Everything on this page, counted. Roughly 90 identified rooms and functional spaces sit across the six blocks."
        />

        <div className="grid gap-10 md:grid-cols-3 md:gap-x-12">
          {glanceGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <h3 className="pb-3 mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-300 border-b border-white/15">
                {group.title}
              </h3>
              <dl>
                {group.rows.map((row) => (
                  <div
                    key={row.category}
                    className="flex items-baseline gap-3 py-3 border-b border-white/[0.07]"
                  >
                    <dt className="text-sm text-white/65">{row.category}</dt>
                    {/* Dotted leader ties the label to its figure. */}
                    <span className="flex-1 border-b border-dotted border-white/20 translate-y-[-0.2rem]" />
                    <dd className="text-sm font-semibold text-white shrink-0 tabular-nums">
                      {row.facilities}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusLedger;
