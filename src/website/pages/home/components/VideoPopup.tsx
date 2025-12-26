import { useState } from "react";
import { Play, X } from "lucide-react";

export default function VideoPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Play Button */}
      <div className="flex flex-col items-center justify-center gap-3 md:gap-6 md:w-[40%]">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Ripple */}
            <span className="absolute w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white opacity-40 animate-ping" />

            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Play
                className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 ml-1"
                fill="currentColor"
              />
            </div>
          </div>
        </button>

        <span className="text-sm sm:text-lg font-medium">Watch Now</span>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-[90%] max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black text-white rounded-full p-2"
            >
              <X size={20} />
            </button>

            {/* YouTube iframe */}
            <iframe
              src="https://www.youtube.com/embed/eibpVkSHOqU?autoplay=1"
              title="YouTube video player"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
