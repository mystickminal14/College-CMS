import arrow from "../../../../assets/arrow.webp";
import { useEnquiry } from "../../../../context/EnquiryContext";

export function ApplyNow() {
  const { open } = useEnquiry();
  return (
    <>
      <section className="bg-white py-4 ms:py-10 md:py-8 lg:px-20 flex relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
          <div className="absolute left-[-5vw] -top-5">
            <img
              src={arrow}
              alt="Curved Dotted Arrow"
              className="hidden lg:block lg:w-[25vw]"
            />
          </div>
          <div className="text-center lg:text-left flex-1">
            <p className="text-xs sm:text-[16px] p-1 md:text-[20px] text-center lg:text-xl text-[#19213DB2] leading-relaxed max-w-1xl">
              Together with our top-notch faculty, we  provide a nurturing environment to help students evolve into{" "}
              <br />
              leaders who think boldly, make effective choices and are well-equipped with{" "} <br />
              futuristic mindset and skills.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex gap-4 justify-center">
              <button
                onClick={() => {
                  console.log("Enquiry button clicked");
                  open();
                }}
                className="uppercase text-[12px] sm:text-[18px] rounded-full bg-[#474AFF] px-5 sm:px-12 py-4 text-white font-medium hover:bg-[#2535c7]"
              >
                Enquire Now
              </button>

              <a
                href="https://apply.lbef.org/"
                target="_blank"
                rel="noreferrer"
                className="uppercase text-[12px] sm:text-[18px] rounded-full border-2 border-[#00000057] bg-white px-5 sm:px-12 py-4 text-[#050038] font-medium hover:bg-[#474AFF] hover:text-white transform transition-transform duration-150 active:scale-95"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Animation */}
      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0 }
            to { transform: scale(1); opacity: 1 }
          }
          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }
        `}
      </style>
    </>
  );
}
