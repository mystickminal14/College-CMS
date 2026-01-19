import { CheckCircle } from "lucide-react";
// import type { Documents } from "../../../../pages/docs-required/model/DocsModel";
// import useGetAllDocs from "../../../../pages/docs-required/hooks/useAllDocs";

const DocumentsRequired = () => {
  // const { data, isLoading } = useGetAllDocs();
  // const documents: Documents[] = data?.data ?? [];

  // const bachelorDocs = documents.filter(doc => doc.type === "BACHELOR");
  // const masterDocs = documents.filter(doc => doc.type === "MASTER");

  const staticDocs = [
    "Attested photocopy of SLC marks sheet and character certificate.",
    "Attested photocopy of 10+2 marks sheet or equivalent academic transcript, character certificate, provisional pass certificate and migration certificate.",
    "Original migration certificate.",
    "Attested photocopies of Bachelor Level marks sheet, provisional pass certificate and degree certificate (Applicable only for Master’s Level applicants).",
    "Attested photocopy of experience certificate (if applicable).",
    "Attested photocopy of proof of nationality.",
  ];

  // const renderSkeleton = () => (
  //   <ul className="space-y-2 animate-pulse">
  //     {Array.from({ length: 5 }).map((_, idx) => (
  //       <li key={idx} className="h-4 bg-gray-300 rounded w-full" />
  //     ))}
  //   </ul>
  // );

  const renderList = (list: string[]) => (
    <ul className="space-y-2">
      {list.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
          <span className="text-sm text-gray-700 leading-snug">{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Documents Required
      </h2>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-3">
        <p className="text-sm text-gray-700">
          After completing the online application process, applicants are
          required to submit the following documents to the Admission Office:
        </p>

        {renderList(staticDocs)}

        {/* 🔁 API-based version (enable anytime)
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2 border-b pb-1">
              Bachelor's Programs
            </h3>
            {isLoading ? renderSkeleton() : renderDocList(bachelorDocs)}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2 border-b pb-1">
              Master's Programs
            </h3>
            {isLoading ? renderSkeleton() : renderDocList(masterDocs)}
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default DocumentsRequired;
