import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../comp/animation';
import decoration from '../../../../assets/decoration.webp';
import apu from "../../../../assets/apu_logo.webp";
import ranking from "../../../../assets/IndustryLogo/Bandung.png";
import md from '../../../../assets/IndustryLogo/md.jpeg';
import TOP from '../../../../assets/IndustryLogo/top.jpeg';
import Asia from '../../../../assets/IndustryLogo/asia.jpeg';
import five from '../../../../assets/IndustryLogo/five.jpeg';

const achievements = [
  {
    stat: 'Top 2%',
    label: 'QS World University Rankings 2026',
    sub: 'Ranked #597 globally — only Malaysian private university with this double distinction',
  },
  {
    stat: '5★ Plus',
    label: 'QS Stars Rating',
    sub: 'First Malaysian university to achieve Five Stars Plus across all QS categories',
  },
  {
    stat: '#2',
    label: 'Private University in Malaysia',
    sub: 'AppliedHE All Asia Private University Ranking 2025',
  },
  {
    stat: '100%',
    label: 'Graduate Employability',
    sub: 'Ministry of Higher Education Graduate Tracer Study — highest paid graduates per MDEC 2024',
  },
  {
    stat: '500+',
    label: 'National & Global Awards',
    sub: 'Including 268 awards across programmes and events in 2025 alone',
  },
  {
    stat: '#16',
    label: 'World for International Students',
    sub: 'Ranked #10 globally for International Student Diversity — QS 2026',
  },
];

const badges = [
  { src: apu, alt: 'APU Logo' },
  { src: ranking, alt: 'QS Ranking Badge' },
  { src: md, alt: 'MD Premier Digital Tech Institution' },
  { src: TOP, alt: 'Top University Badge' },
  { src: Asia, alt: 'Asia Ranking Badge' },
  { src: five, alt: 'QS 5 Star Rating' },
];

export default function AchievementsSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div className="text-center mb-14" variants={fadeUp}>
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Recognition & Rankings
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            APU's{' '}
            <span className="relative inline-block text-[#474AFF]">
              Achievements
              <img
                src={decoration}
                alt=""
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-full h-3 pointer-events-none"
              />
            </span>
          </h2>
          <p className="mt-5 text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
            Consistently ranked among the world's top universities, APU's
            accolades reflect a commitment to excellence in technology,
            innovation, and graduate employability.
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
          variants={staggerContainer}
        >
          {achievements.map((a) => (
            <motion.div
              key={a.stat}
              className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 flex flex-col gap-2"
              variants={fadeUp}
              whileHover={{ y: -4 }}
            >
              <p className="text-3xl font-extrabold text-[#474AFF]">{a.stat}</p>
              <p className="font-semibold text-gray-900 text-base">{a.label}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{a.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Badge strip */}
        <motion.div variants={fadeUp}>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Official Badges & Recognitions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {badges.map((badge, i) => (
              <motion.img
                key={i}
                src={badge.src}
                alt={badge.alt}
                className="h-18 md:h-25 w-auto object-contain"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}