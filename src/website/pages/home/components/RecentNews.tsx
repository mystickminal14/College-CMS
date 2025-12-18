import decoration from '../../../../assets/decoration.png';

const RecentNews = () => {
  return (
    <div className=" bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Recent <span className="relative inline-block">
            News
            <img
              src={decoration}
              alt="Decoration"
              className="absolute left-1/2 -translate-x-1/2 w-full h-3"
            />
          </span>{" "}
        </h1>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://via.placeholder.com/400x300?text=Graduation+Ceremony+LDEF+25" // Replace with actual image URL
              alt="News 1"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                लडबुड फाउण्डेशन पास कम क्रिकेटको प्रयासक
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                काठमाडौं । लडबुड एजुकेशन फाउण्डेशनले प्रवान्तीका कम राखिए
                बिकेट अभियन्ताहरूलाई क्रिकेटमा प्रवेशको अवसर दिने प्रयास गरेको छ।
                यस प्रयासले कमजोर आर्थिक अवस्थाका युवाहरूलाई क्रिकेटमा अवसर दिने
                लक्ष्य राखेको छ । फाउण्डेशनका अध्यक्ष तथा अन्य पदाधिकारीहरूले
                क्रिकेट एसोसिएसन अफ नेपालका पदाधिकारीसँग परामर्श गरी यस प्रयासलाई
                अगाडि बढाएका छन् ।
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>The Kathmandu Post</span>
                <span>2025-04-03</span>
              </div>
            </div>
          </div>

          {/* Card 2 (Similar to Card 1) */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://via.placeholder.com/400x300?text=Graduation+Ceremony+LDEF+25" // Replace with actual image URL
              alt="News 2"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                लडबुड फाउण्डेशन पास कम क्रिकेटको प्रयासक
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                काठमाडौं । लडबुड एजुकेशन फाउण्डेशनले प्रवान्तीका कम राखिए
                बिकेट अभियन्ताहरूलाई क्रिकेटमा प्रवेशको अवसर दिने प्रयास गरेको छ।
                यस प्रयासले कमजोर आर्थिक अवस्थाका युवाहरूलाई क्रिकेटमा अवसर दिने
                लक्ष्य राखेको छ । फाउण्डेशनका अध्यक्ष तथा अन्य पदाधिकारीहरूले
                क्रिकेट एसोसिएसन अफ नेपालका पदाधिकारीसँग परामर्श गरी यस प्रयासलाई
                अगाडि बढाएका छन् ।
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>The Kathmandu Post</span>
                <span>2025-04-03</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://via.placeholder.com/400x300?text=Graduation+Ceremony+LDEF+25" // Replace with actual image URL
              alt="News 3"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                लडबुड फाउण्डेशन पास कम क्रिकेटको प्रयासक
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                काठमाडौं । लडबुड एजुकेशन फाउण्डेशनले प्रवान्तीका कम राखिए
                बिकेट अभियन्ताहरूलाई क्रिकेटमा प्रवेशको अवसर दिने प्रयास गरेको छ।
                यस प्रयासले कमजोर आर्थिक अवस्थाका युवाहरूलाई क्रिकेटमा अवसर दिने
                लक्ष्य राखेको छ । फाउण्डेशनका अध्यक्ष तथा अन्य पदाधिकारीहरूले
                क्रिकेट एसोसिएसन अफ नेपालका पदाधिकारीसँग परामर्श गरी यस प्रयासलाई
                अगाडि बढाएका छन् ।
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>The Kathmandu Post</span>
                <span>2025-04-03</span>
              </div>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 border-2 border-[#3040E5] text-[#3040E5] font-semibold rounded-full cursor-pointer transition-colors duration-200">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentNews;