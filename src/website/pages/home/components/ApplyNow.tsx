import arrow from "../../../../assets/arrow.png"

export function ApplyNow() {
  return (
    <section className="bg-white py-5 ms:py-10 md:py-16 lg:px-20 flex relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 ">
        {/* Left: Curved Dotted Arrow */}
        <div className="absolute left-[-5vw]">
          <img
            src={arrow}
            alt="Curved Dotted Arrow"
            className="hidden lg:block lg:w-[30vw]"
          />

        </div>

        {/* Right: Text + Buttons */}
        <div className="text-center lg:text-left flex-1 relative">
          <p className="text-[12px] sm:text-[16px] md:text-[20px] text-center lg:text-xl text-[#19213DB2] leading-relaxed max-w-1xl">
            Together with our top-notch faculty, we  provide a nurturing environment to help students evolve into{" "}
            leaders who think boldly, make effective choices and are well-equipped with{" "}
            futuristic mindset and skills.
          </p>

          <div className="mt-10 flex flex-row gap-4 justify-center  apply-button">
            <a
              href="#"
              className="inline-flex uppercase items-center justify-center text-[12px] sm:text-[18px] rounded-full bg-[#3040E5] px-5 sm:px-12 py-4 text-white font-medium transition hover:bg-[#2535c7] shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="inline-flex items-center uppercase justify-center text-[12px] sm:text-[18px] rounded-full border-2 border-[#00000057] bg-white  px-5 sm:px-12 py-4 text-[#050038] font-medium transition hover:bg-[#3040E5] hover:text-white hover:ease-in-out"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}