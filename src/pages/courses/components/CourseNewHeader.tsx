import decoration from "../../../assets/decoration.png";

import { motion } from 'framer-motion';
import { fadeUp } from '../../../website/comp/animation';
import type { Courses } from "../model/CourseModel";
interface CourseHeaderProps {
    course: Courses;
}
export default function CourseNewHeader({ course }: CourseHeaderProps) {
   const titleWords = course.title.split(" ");

  const line1Word = titleWords[0];

  const line2Words = titleWords.slice(1, 5);
  const line2FirstWord = line2Words[0];
  const line2RemainingWords = line2Words.slice(1).join(" ");

  const line3Words = titleWords.slice(5);
  const line3LastWord = line3Words[line3Words.length - 1];
  const line3RemainingWords = line3Words.slice(0, -1).join(" ");

    return (
       <div className="w-full px-4 sm:px-6 md:px-0 md:container md:mx-auto py-6 md:py-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-600 font-medium text-sm">
              {course.degree.toUpperCase()}'S DEGREE
            </span>
          </div>

          <h1 className="text-xl sm:text-4xl md:text-7xl font-bold mb-8 leading-snug sm:leading-tight">
            {course.prefix} in{" "}
            <span className="relative inline-block text-blue-600 font-bold">
              {line1Word}
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
              />
            </span>

            {line2Words.length > 0 && (
              <>
                <br />
                <span className="text-blue-600 mt-1 font-bold">
                  {line2FirstWord}
                </span>{" "}
                {line2RemainingWords}
              </>
            )}

            {/* ---------- LINE 3 ---------- */}
            {line3Words.length > 0 && (
              <>
                <br />
                {line3RemainingWords && (
                  <span>{line3RemainingWords} </span>
                )}
                <span className="relative mt-1 inline-block text-blue-600 font-bold">
                  {line3LastWord}
                  <img
                    src={decoration}
                    alt="Decoration"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2"
                  />
                </span>
              </>
            )}
          </h1>
        </motion.div>
      </div>
  )
}
