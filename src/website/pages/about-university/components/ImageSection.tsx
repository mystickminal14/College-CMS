import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import image from "../../../../assets/university_image.webp";

export function ImageSection() {
  return (
    <motion.div
      className="max-w-7xl py-5 mx-auto flex justify-center"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.img
        src={image}
        alt="University"
        className="w-full max-w-4xl object-contain"
        variants={fadeUp}
      />
    </motion.div>
  );
}
