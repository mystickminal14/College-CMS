import butterfiles from "../../../../assets/butterfiles.png"
import { motion } from "framer-motion";
import graduation from "../../../../assets/images/home5.jpg"

export function HeroSection() {
  return (
    <>
      <section className="bg-white flex flex-col lg:flex-row items-center justify-center lg:justify-between p-4 md:p-6 lg:p-10 lg:pt-15">
        {/* Left line - hidden on mobile */}
        <div className="hidden lg:flex items-center">
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
          <div className="h-0.5 bg-[#0F183F] w-[10vw]"></div>
        </div>

        <div
          className="
          font-bold
          text-[21px]
          [@media(min-width:380px)]:text-[7vw]
          text-center lg:text-left
          "
        >
          <div className="inline-block">
            <span className="relative inline-block">
              <motion.span
                initial={{ opacity: 0, x: -300 }} // come from left
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.1 }}
                className="text-md sm:text-lg lg:text-[6vw]"
              >
                Welcome
              </motion.span>

              <motion.span
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.3 }}
                className="absolute text-[6px] md:text-[1vw] left-0 font-normal"
              >
                The First IT College of Nepal
              </motion.span>
            </span>
          </div>

          <motion.span
            initial={{ opacity: 0, x: -300 }} // come from left
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.2 }}
            className="relative"
          >
            <span className="lg:text-[6vw]"> to {""}</span>
            <motion.span
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.4 }}
              className="absolute text-[5px] md:text-[1vw] left-0 top-[0.5vw] font-normal"
            >
              Evolve With
            </motion.span>
          </motion.span>

          <span
            className="text-white pl-2 pr-2 sm:pl-3 sm:pr-3 inline-block relative mx-1 sm:mx-2"
            style={{
              backgroundColor: "#474AFF",
              borderTopRightRadius: "50px",
              borderBottomLeftRadius: "50px",
              padding: "0 8px sm:0 12px",
            }}
          >
            <motion.span
              className="absolute h-[2vh] w-[2vw] left-[8.5vw] top-[1.5vw]"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
            >
              <img src={butterfiles} alt="Butterflies" />
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.3 }}
            >
              LBEF
            </motion.span>
          </span>

          <span className="inline-block ml-1 sm:ml-2">{" "}</span>

          <span className="relative ">
            <motion.span
              initial={{ opacity: 0, x: 300 }} // come from right
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.4 }}
              className="md:text-[5vw]"
            >
              College
            </motion.span>
          </span>
        </div>

        {/* Right line - hidden on mobile */}
        <div className="hidden lg:flex items-center">
          <div className="h-0.5 bg-[#0F183F] w-[10vw]"></div>
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
        </div>
      </section>

      <section className="w-90vw h-[40vw] md:h-[22vw] relative overflow-hidden">
        <img
          src={graduation}
          alt="Graduation"
          className="w-full h-full object-cover object-[50%_35%]"
        />
      </section>
    </>
  );
}
