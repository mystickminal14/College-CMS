import Image from "../../../../assets/girl_left_side.png";
const partners = [
  { id: 1, name: "Academic Academy", image: Image },
  { id: 2, name: "University 1890", image: Image },
  { id: 3, name: "Elite College", image: Image },
  { id: 4, name: "Skilled University", image: Image },
  { id: 5, name: "Global University", image: Image },
  { id: 6, name: "Excellence Institute", image: Image },
  { id: 7, name: "Innovation Academy", image: Image },
  { id: 8, name: "Premier University", image: Image },
];

export function OurPartners() {
  return (
    <section className="py-20 px-6 lg:px-20 bg-[#0066FF0A]">
      <div className="max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <div className="text-center lg:text-left">
            <p className="text-blue-600 font-semibold text-lg mb-4">Our Partners</p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Trusted by Leading<br />
              Organizations Worldwide
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Our platform supports organizations of all sizes in upskilling their workforce through expert-led training.
            </p>
          </div>

          {/* Right Side - Logos Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="
                  bg-white 
                  rounded-2xl 
                  shadow-lg 
                  flex 
                  items-center 
                  justify-center 
                  hover:shadow-2xl 
                  hover:scale-105 
                  transition-all 
                  duration-300 
                  border 
                  border-gray-100
                "
              >
                {/* Replace with real logo or placeholder */}
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}