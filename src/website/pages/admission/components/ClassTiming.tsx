import { Clock } from "lucide-react";

const ClassTiming = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Class Timing</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                Course
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                Lecture Hours
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Tutorials
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                B.Sc.(IT)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                06:30 A.M – 11:00 A.M
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                11:00 A.M – 1:00 P.M
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                M.Sc.(ITM)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                06:30 A.M– 09:00 A.M (Sunday– Friday)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                09:45 A.M – 11:30 A.M
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Class timings are subject to change. Please confirm with the administration office for the most current schedule.
        </p>
      </div>
    </div>
  );
};

export default ClassTiming;