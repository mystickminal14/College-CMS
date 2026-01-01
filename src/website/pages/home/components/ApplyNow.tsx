import { useState, useEffect } from "react";
import arrow from "../../../../assets/arrow.png";

export function ApplyNow() {
  const [open, setOpen] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* SECTION */}
      <section className="bg-white py-4 ms:py-10 md:py-8 lg:px-20 flex relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">

          {/* Arrow */}
          <div className="absolute left-[-5vw] -top-5">
            <img
              src={arrow}
              alt="Curved Dotted Arrow"
              className="hidden lg:block lg:w-[25vw]"
            />
          </div>

          {/* Content */}
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
                onClick={() => setOpen(true)}
                className="uppercase text-[12px] sm:text-[18px] rounded-full bg-[#474AFF] px-5 sm:px-12 py-4 text-white font-medium hover:bg-[#2535c7] shadow-lg"
              >
                Enquiry Now
              </button>

              <a
                href="https://apply.lbef.org/"
                target="_blank"
                rel="noreferrer"
                className="uppercase text-[12px] sm:text-[18px] rounded-full border-2 border-[#00000057] bg-white px-5 sm:px-12 py-4 text-[#050038] font-medium hover:bg-[#474AFF] hover:text-white"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* POPUP MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 animate-scaleIn">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#050038] mb-2">
              Enquiry Form
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill in your details and we’ll contact you shortly.
            </p>


          </div>
        </div>
      )}

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
