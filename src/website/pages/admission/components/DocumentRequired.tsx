import { CheckCircle } from "lucide-react";
import type { Documents } from "../../../../pages/docs-required/model/DocsModel";
import useGetAllDocs from "../../../../pages/docs-required/hooks/useAllDocs";

const DocumentsRequired = () => {
  const { data, isLoading } = useGetAllDocs();
  const documents: Documents[] = data?.data ?? [];

  const bachelorDocs = documents.filter(doc => doc.type === "BACHELOR");
  const masterDocs = documents.filter(doc => doc.type === "MASTER");

  const renderDocList = (docs: Documents[]) => {
    if (!docs.length) return <p className="text-gray-500">No documents currently.</p>;

    return (
      <ul className="space-y-3">
        {docs.map((doc) => (
          <li key={doc.id} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
            <span className="text-gray-700">{doc.document}</span>
          </li>
        ))}
      </ul>
    );
  };

  const renderSkeleton = () => (
    <ul className="space-y-3 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <li key={idx} className="h-4 bg-gray-300 rounded w-full"></li>
      ))}
    </ul>
  );

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
            {isLoading ? renderSkeleton() : renderDocList(bachelorDocs)}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">For Master's Programs</h3>
            {isLoading ? renderSkeleton() : renderDocList(masterDocs)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsRequired;
