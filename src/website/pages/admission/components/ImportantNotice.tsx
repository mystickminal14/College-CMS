import { AlertCircle } from "lucide-react";

const ImportantNotice = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-8">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2 sm:mb-3">
              Important Notice
            </h3>
            <p className="text-xs sm:text-base text-gray-700 mb-2 sm:mb-3 leading-relaxed">
              Lord Buddha Education Foundation (Licensed Under LBEF Vidyapeeth Pvt. Ltd.) has been permitted by Ministry of Education to run the courses from Asia Pacific University of Technology & Innovation, Malaysia. All the Degrees will be awarded by APU.
            </p>
            <p className="text-xs sm:text-base text-gray-700 font-semibold leading-relaxed">
              Students are advised to read the prospectus & admission guidelines carefully before joining any programme. Fee once paid are not refunded in any circumstances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantNotice;
