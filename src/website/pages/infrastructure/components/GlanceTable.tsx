import { motion } from "framer-motion";
import { glanceRows } from "../data";
import SectionHeading from "./SectionHeading";

const GlanceTable = () => {
  return (
    <section className="mb-16 md:mb-20">
      <SectionHeading
        title="Infrastructure"
        highlightedText="at a Glance"
        subtitle="A summary of the facilities available across the six campus blocks."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto overflow-hidden border border-gray-200 shadow-lg rounded-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-white bg-blue-600">
                <th className="px-5 py-4 text-sm font-semibold md:text-base">
                  Infrastructure Category
                </th>
                <th className="px-5 py-4 text-sm font-semibold md:text-base whitespace-nowrap">
                  Available Facilities
                </th>
              </tr>
            </thead>
            <tbody>
              {glanceRows.map((row, index) => (
                <tr
                  key={row.category}
                  className={`border-t border-gray-100 transition-colors hover:bg-blue-50/60 ${
                    index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-3.5 text-sm text-gray-600 md:text-base">
                    {row.category}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 md:text-base">
                    {row.facilities}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default GlanceTable;
