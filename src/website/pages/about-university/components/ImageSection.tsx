import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import image from "../../../../assets/qs-5star.webp";
import decoration from '../../../../assets/decoration.webp';

export function ImageSection() {
  return (
    <motion.section
      className="w-full py-16 bg-white"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Text above */}
      <motion.div className="max-w-3xl mx-auto px-6 text-center mb-10" variants={fadeUp}>
        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
          QS Stars Rating System
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
          APU Awarded{' '}
          <span className="relative inline-block text-[#474AFF]">
            5-Star Rating
            <img
              src={decoration}
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] w-full h-3 pointer-events-none"
            />
          </span>{' '}
          for Online Learning
        </h2>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
          APU has been awarded the highest possible 5-Star Rating for Online
          Learning by Quacquarelli Symonds (QS) — recognising our commitment
          to innovative, student-centred digital education accessible anytime,
          anywhere.
        </p>
      </motion.div>

      {/* Full-width banner image */}
      <motion.img
        src={image}
        alt="APU QS 5-Star Rating for Online Learning"
        className="w-full h-auto object-cover"
        variants={fadeUp}
      />
    </motion.section>
  );
}