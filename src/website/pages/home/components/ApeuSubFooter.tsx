import subfootertwo from '../../../../assets/subfootertwo.webp';

export default function ApeuSubFooter() {
  return (
<div className="w-full min-h-screen overflow-hidden bg-linear-to-b from-blue-50 via-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full text-center">
          <div className="w-full inline-block mb-10">
            <img
              src={subfootertwo}
              alt="Illustration part two"
              className="
                w-full
                max-w-7xl
                h-auto
                object-contain
                mx-auto
                block
                rounded-xl
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
