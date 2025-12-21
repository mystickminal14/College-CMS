import decoration from '../../../../assets/decoration.png';
export default function Events() {
  const events = [
    {
      id: 1,
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      date: { month: "APR", day: 14 },
      description:
        "We'll get you directly seated and inside for you to enjoy the show.",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
      date: { month: "AUG", day: 20 },
      description:
        "Directly seated and inside for you to enjoy the show.",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "2011 Super Junior SM Town Live 10 World Tour New York City",
      date: { month: "SEP", day: 18 },
      description:
        "Directly seated and inside for you to enjoy the show.",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",

    },
  ];

  return (
    <div className=" bg-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          Upcoming <span className="relative inline-block text-[#474AFF]">
            Events
            <img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 w-full h-3"
            />
          </span>{" "}
        </h1>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 ">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col group cursor-pointer h-full shadow-2xl rounded-4xl"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl mb-6 bg-gray-200 h-48 md:h-56">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Date Badge - Left Aligned */}
              <div className='flex gap-7 p-5 '>
                <div className="flex items-start">
                  <div className="text-left">
                    <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {event.date.month}
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {event.date.day}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3 border-2 border-[#474AFF] text-[#474AFF] font-semibold rounded-full cursor-pointer transition-colors duration-200">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
