import employment from '../../../../assets/Learning Emplyability.png'
import decoration from '../../../../assets/decoration.png';

export default function Employability() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto text-center mb-16 lg:mb-24">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Learning for <span className="relative inline-block text-[#474AFF]">
              Of Institutions
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Employers look for qualified people who have the technical know-how and the ability to communicate, work in teams and other personal skills. At ALPU, our programmes are developed to provide you not only with interesting and stimulating modules to develop your mind, but also to enhance your knowledge and skills and increase your ability to compete for that dream job that you have always wanted. To learn, develop and adapt. Much of what is current knowledge will soon be out-of-date and the reality is that to succeed you need to be adaptable and innovative. We achieve this through the five "I"s Model:
          </p>
        </div>

        {/* Timeline Section */}
        <div className="max-w-6xl mx-auto">
          <img src={employment} alt="" />
        </div>
      </div>
    </div>
  );
}
