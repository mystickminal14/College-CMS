import CustomBreadcrumb from "../../comp/bread-crump";
import bgImage from '../../../assets/OurTeam.jpg';
import decoration from '../../../assets/decoration.png';
import useGetAll from "./hook/useGetRecognitionAll";
import RecognitionsCardView from "./component/RecognitionCard";

const RecognitionPageWeb = () => {
  const { data, isLoading, isError } = useGetAll();
  const recognitions = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomBreadcrumb
        bgImage={bgImage}
        title="Recognitions"
        objectPosition="50%_40%"
        breadcrumbs={[
          { label: "Home" },
          { label: "About" },
          { label: "Recognitions" },
        ]}
      />

      <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-600 font-medium text-sm">
              Discover Our Achievements
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Our College </span>
            <span className="relative inline-block">
              <span className="text-blue-600 relative z-10"> Recognitions</span>
              <img
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3"
              />
            </span>{" "}
            <br />
            <span className="text-blue-600 ">Over </span>
            <span className="text-gray-900 relative z-10"> The Years </span>

          </h1>
          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Celebrating excellence, dedication, and success. Explore the academic and
            institutional recognitions and achievements that reflect our commitment to
            growth and distinction.
          </p>


        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-5">
        <RecognitionsCardView
          recognitions={recognitions}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default RecognitionPageWeb;
