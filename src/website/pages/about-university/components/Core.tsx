import { motion, type Variants } from 'framer-motion';
import decoration from '../../../../assets/decoration.webp';
import imageone from '../../../../assets/core/drparam.webp';
import imagetwo from '../../../../assets/core/prof.webp';
import bg1 from '../../../../assets/apu-bg.webp';
import { useNavigate } from 'react-router-dom';

const messages = [
  {
    id: 3,
    name: "Datuk Paramjeet Singh",
    position: "CO-FOUNDER & CEO",
    institution: "APIIT Education Group",
    message:
      "Dear Students,\nWe welcome LBEF to the international community of the Asia Pacific University of Technology & Innovation (APU). Parents, prospective & current students will be pleased to note that over 11,000 students including international students from over 120 countries are currently....",
    image: imageone,
  },
  {
    id: 4,
    name: "Prof. Dr. Ho Chin Kuan",
    position: "VICE CHANCELLOR",
    institution: "Asia Pacific University",
    message:
      "Dear Students,\nI would like to extend a warm welcome to students who are part of the APU – LBEF academic partnership. The APU – LBEF partnership which started in 2016 has produced around 300 graduates. Student centricity and uncompromising quality are at the heart...",
    image: imagetwo,
  },
];

export default function OurCore() {
  const navigate = useNavigate();

  const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const fadeRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-[#474AFF] opacity-65" />

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white text-lg font-medium mb-2">
            Meet Our Leaders
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Messages from{' '}
            <span className="relative inline-block text-white">
              Our Leaders 
              <img
                src={decoration}
                alt=""
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>
            {' '}At University
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-12 justify-center items-center">
          {messages.map((lead, index) => (
            <motion.div
              key={lead.id}
              onClick={() => navigate(`/messages/${lead.id}`)}
              className="pl-10 w-full sm:w-[520px] relative bg-white rounded-2xl shadow-md transition-transform hover:scale-105 cursor-pointer"
              variants={index % 2 === 0 ? fadeLeft : fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.07 }}
            >
              <div className="flex items-center gap-4 pt-6 pl-6 pb-2 pr-6 ">
                <div className="w-20 h-20 rounded-full absolute top-5 -left-10 z-20 overflow-hidden border-4 border-[#474AFF]">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {lead.name}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {lead.position}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lead.institution}
                  </p>
                </div>
              </div>

              <div className="pt-2 pl-6 pb-6 pr-6 text-gray-700 whitespace-pre-line">
                {lead.message}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
