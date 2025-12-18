import { CheckCircle } from "lucide-react";

const DocumentsRequired = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents Required</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-700 mb-6">
          After completing the online application process, applicants are required to submit the following documents to the Admission Office:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">For Bachelor's Programs</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700">Attested photocopy of SLC marks sheet and character certificate</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700">Attested photocopy of 10+2 marks sheet or equivalent academic transcript</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700">Character certificate, provisional pass certificate and migration certificate</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700">Original migration certificate</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">For Master's Programs</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700">All Bachelor's level documents mentioned above</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700">Attested photocopies of Bachelor Level marks sheet</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700">Provisional pass certificate, degree certificate</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700">Attested photocopies of experience certificate (if applicable)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-700">Attested photocopy of proof of nationality</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsRequired;