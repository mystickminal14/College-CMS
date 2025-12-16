// Example images (replace with your actual imports)
import Logo1 from "../../../../assets/lbef_black.jpeg";
import Logo2 from "../../../../assets/lbef_black.jpeg";
import Logo3 from "../../../../assets/lbef_black.jpeg";
import Logo4 from "../../../../assets/lbef_black.jpeg";
import decoration from '../../../../assets/decoration.png';

const partners = [
  { id: 1, name: "LBEF College", image: Logo1 },
  { id: 2, name: "LBEF IT College", image: Logo2 },
  { id: 3, name: "Partner 3", image: Logo3 },
  { id: 4, name: "Partner 4", image: Logo4 },
];

const PartnerSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-10">
        <p className="text-blue-600 text-sm mb-2">Partner Institution</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          LBEF Group <span className="relative inline-block">
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

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 p-3 sm:p-6 md:p-0">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="border border-gray-200 p-6 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={partner.image}
              alt={partner.name}
              className="max-h-24 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnerSection;
