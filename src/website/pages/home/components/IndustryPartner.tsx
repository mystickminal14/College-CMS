import Logo1 from "../../../../assets/IndustryLogo/1.webp"; // Cisco Networking Academy
import Logo2 from "../../../../assets/IndustryLogo/4.webp"; // Red Hat Academy
import Logo3 from "../../../../assets/IndustryLogo/2.webp"; // AWS Academy
// import Logo4 from "../../../../assets/IndustryLogo/3.webp"; // Oracle Academy
import decoration from "../../../../assets/decoration.webp";

const partners = [
  {
    id: 1,
    name: "Cisco Networking Academy",
    image: Logo1,
    description: "Networking & Cybersecurity",
  },
  {
    id: 2,
    name: "AWS Academy",
    image: Logo3,
    description: "Cloud Computing",
  },
  // {
  //   id: 3,
  //   name: "Oracle Academy",
  //   image: Logo4,
  //   description: "Database & Enterprise Tech",
  // },
  {
    id: 3,
    name: "Red Hat Academy",
    image: Logo2,
    description: "Linux & Open Source",
  },
];

const IndustryPartnerSection = () => {
  return (
    <section className="py-16 bg-[#0f1560]">
      {/* Header */}
      <div className="text-center mb-14 px-4">
        <p className="text-blue-300 text-sm font-semibold  tracking-widest mb-3">
          Globally connected. Industry ready.

        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Our Industry{" "}
          <span className="relative inline-block text-[#7B9EFF]">
            Partners
            <img
              src={decoration}
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-full h-3 pointer-events-none opacity-50"
            />
          </span>
        </h2>
        <p className="text-blue-200 max-w-xl mx-auto text-base md:text-lg mt-4">
          We collaborate with globally recognized technology leaders to bring
          students industry-standard certifications, hands-on labs, and
          real-world learning experiences.
        </p>
      </div>

      {/* Partner Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group flex flex-col items-center justify-center gap-3 border border-white/10 rounded-2xl p-5 sm:p-6 bg-white "
            >
              <div className="w-full flex items-center justify-center h-14 sm:h-16">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-full max-w-[220px] w-auto object-contain"
                />
              </div>

            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default IndustryPartnerSection;