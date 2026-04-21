import decoration from "../../../assets/decoration.webp";
import { motion } from "framer-motion";
import { fadeUp } from "../../../website/comp/animation";
import type { Courses } from "../model/CourseModel";

interface CourseHeaderProps {
  course: Courses;
}

export default function CourseNewHeader({ course }: CourseHeaderProps) {
  // ✅ Clean title
  const cleanTitle = course.title?.trim().replace(/\s+/g, " ") || "";

  // ✅ Split words
  const words = cleanTitle.split(" ");

  // ✅ Function to split into lines (max words per line)
  const splitIntoLines = (words: string[], maxWordsPerLine = 3) => {
    const lines: string[] = [];
    for (let i = 0; i < words.length; i += maxWordsPerLine) {
      lines.push(words.slice(i, i + maxWordsPerLine).join(" "));
    }
    return lines;
  };

  // ✅ Dynamic lines (auto break if long)
  const lines = splitIntoLines(words, 3); // change 3 → 2 or 4 if needed

  return (
    <div className="w-full px-4 sm:px-6 md:px-0 md:container md:mx-auto py-6 md:py-20 text-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-5xl mx-auto"
      >
        {/* DEGREE BADGE */}
        {/* <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-blue-600 font-medium text-sm">
            {course.degree?.toUpperCase()}'S DEGREE
          </span>
        </div> */}

        {/* TITLE */}
        <h1 className="text-xl sm:text-4xl md:text-7xl font-bold mb-8 leading-snug sm:leading-tight">
          {course.prefix}{" "}

          {lines.map((line, index) => (
            <span key={index}>
              {/* First line with underline */}
              {index === 0 ? (
                <span className="relative inline-block text-blue-600 font-bold">
                  {line}
                  <img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
                  />
                </span>
              ) : (
                <span className="block mt-1">
                  {line}
                </span>
              )}
            </span>
          ))}
        </h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto"
        >
          {course.fullForm}
        </motion.p>
      </motion.div>
    </div>
  );
}