// Example images (replace with your actual imports)
import Logo1 from "../../../../assets/partners/aakshar.png";
import Logo2 from "../../../../assets/partners/guru.png";
import Logo3 from "../../../../assets/partners/lbef.png";
import Logo4 from "../../../../assets/partners/pcps.jpg";
import decoration from '../../../../assets/decoration.png';

const partners = [
  { id: 1, name: "LBEF College", image: Logo1 },
  { id: 2, name: "LBEF IT College", image: Logo2 },
  { id: 3, name: "Partner 3", image: Logo3 },
  { id: 4, name: "Partner 4", image: Logo4 },
];

const PartnerSection = () => {
  return (
    <section className="py:12 md:py-12 bg-white">
      <div className="text-center mb-10">
        <p className="text-blue-600 text-sm mb-2">Partner Institution</p>
        <h2 className="text-4xl md:text-5xl  font-bold line-height-1 text-gray-900 mb-3">
          LBEF Group <span className="relative inline-block text-[#474AFF]">
            Of Institutions
            <img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 w-full h-3"
            />
          </span>
        </h2>
        <p className="text-gray-500">Our college Partner organizations.</p>
      </div>

    <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6">
  {partners.map((partner) => (
    <div
      key={partner.id}
      className="border border-gray-200 p-4 sm:p-6 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow duration-300 bg-white"
    >
      <img
        src={partner.image}
        alt={partner.name}
        className="w-full max-w-[180px] h-auto md:w-[200px]  object-cover"
      />
    </div>
  ))}
</div>
    </section>
  );
};

export default PartnerSection;
