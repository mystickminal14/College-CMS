// JournalIssueDetails.tsx
import { useNavigate, useParams } from "react-router-dom";
import useGetJournalDetails from "../../../pages/journal/hooks/details/useGetJournalDetails";
import { parseDate } from "../../../utils/ParseDate";
import Seo from "../../../context/seo";
import { IMAGE_URL } from "../../../constants";
import { makeJournalSlug, makeJournalUrl } from "./journalUrl";

const JournalIssueDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetJournalDetails(id!);

  const details = data?.data ?? [];
  const navigate = useNavigate();


  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 h-16 rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (!details.length) {
    return (

      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No Articles Found
        </h3>
        <p className="text-gray-500">
          There are no articles published in this issue yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <Seo
        title="Journal Issue | LBEF Research Journal"
        description="View detailed articles and publications from this issue of the LBEF Research Journal in science, technology, and management."
      />
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Articles in This Issue
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {details.length} articles published
            </p>
          </div>
          <button
            onClick={() => navigate("/lrjstm")}
            className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 cursor-pointer"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Issues
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Article Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {details.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-blue-50/50 transition-colors duration-150 group"
              >
                {/* Index */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100">
                    <span className="font-semibold text-blue-600">
                      {index + 1}
                    </span>
                  </div>
                </td>

                {/* Article Details */}
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>

                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2 shrink-0 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="truncate">
                          {item.authors?.join(", ")}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        {item.pages && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            📄 {item.pages} pages
                          </span>
                        )}
                        {item.availableOnline && (
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded">
                            🌐 {parseDate(item.availableOnline)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Subject (FIXED TEXT HANDLING ONLY) */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                    bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100
                    max-w-[220px] whitespace-normal wrap-break-words text-left leading-snug">
                    {item.subject}
                  </span>
                </td>

                {/* Country */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                    <span className="font-medium text-gray-700">
                      {item.country}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {item.abstract && (
                      <button
                        onClick={() =>
                          navigate(
                            `/lrjstm/volume/abstract/${id}/${
                              makeJournalSlug(item.pageNo) || item.id
                            }`,
                            { state: { article: item } }
                          )
                        }
                        className="flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Abstract
                      </button>
                    )}


                    {(() => {
                        const pdfUrl = makeJournalUrl(item.pageNo) || (item.link ? `${IMAGE_URL}${item.link}` : "");
                        if (pdfUrl) {
                          return (
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center px-3 py-1.5 text-sm bg-linear-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 rounded-lg transition-all shadow-sm hover:shadow"
                            >
                              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              PDF
                            </a>
                          );
                        }
                        return (
                          <span className="flex items-center px-3 py-1.5 text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            No PDF
                          </span>
                        );
                      })()}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JournalIssueDetails;
