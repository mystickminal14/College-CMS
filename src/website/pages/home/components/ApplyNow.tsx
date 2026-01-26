import { useEffect, useState } from "react";
import arrow from "../../../../assets/arrow.webp";

export function ApplyNow() {
  const [openModal, setOpenModal] = useState(false);

  // Debug on mount
  useEffect(() => {
    console.log("[ApplyNow] Component mounted");
    console.log("[ApplyNow] window.npf_wgts on mount:", window.npf_wgts);
  }, []);

  // Reload Meritto when modal opens
  useEffect(() => {
    console.log("[ApplyNow] openModal:", openModal);

    if (openModal) {
      console.log("[ApplyNow] Modal opened → waiting for DOM");

      setTimeout(() => {
        console.log("[ApplyNow] Attempting Meritto load");

        if (window.npf_wgts?.load) {
          console.log("[ApplyNow] Calling window.npf_wgts.load()");
          window.npf_wgts.load();
        } else {
          console.log("[ApplyNow] window.npf_wgts.load NOT available");
        }
      }, 300);
    }
  }, [openModal]);

  return (
    <>
      <section className="bg-white py-8 flex justify-center relative">
        <div className="max-w-5xl text-center">

          <img
            src={arrow}
            alt="arrow"
            className="hidden lg:block absolute left-0 -top-4 w-[20vw]"
          />

          <p className="text-gray-600 text-lg">
            Together with our top-notch faculty, we provide a nurturing
            environment to help students evolve into leaders with futuristic
            skills.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full">
              Enquiry Now
            </button>

            <button
              onClick={() => {
                console.log("[ApplyNow] Apply Now clicked");
                setOpenModal(true);
              }}
              className="border px-8 py-3 rounded-full"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-[95%] md:w-[65%] rounded-xl relative">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Apply Now</h2>
              <button
                onClick={() => {
                  console.log("[ApplyNow] Modal closed");
                  setOpenModal(false);
                }}
                className="text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Meritto Widget */}
            <div className="p-6">
              <div
                className="npf_wgts"
                data-w="37b0a5e5264dcf9f208d052c97b65286"
              ></div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .npf_wgts iframe {
            width: 100% !important;
            min-height: 600px;
            border: none;
          }
        `}
      </style>
    </>
  );
}
