import { Clock } from "lucide-react";
import useGetEnabledCourses from "../../../../pages/courses/hooks/useGetEnabledCourses";
import { formatTimeRange } from "../../../../pages/class-timing/utils/format";
import type { ClassTiming as ClassTimingModel } from "../../../../pages/class-timing/model/ClassTimingModel";

/** "6:30 AM – 11:00 AM · Sunday – Friday", or whichever half exists */
const describe = (timing: ClassTimingModel) =>
  [formatTimeRange(timing), timing.days].filter(Boolean).join(" · ");

const ClassTiming = () => {
  const { data, isLoading, isError } = useGetEnabledCourses();

  // One row per course, built from the timings assigned to it
  const rows = (data?.data ?? [])
    .map((course) => {
      const timings = course.classTimings ?? [];
      return {
        id: course.id,
        name: `${course.prefix ?? ""} ${course.title ?? ""}`.trim(),
        lectures: timings.filter((timing) => timing.kind === "LECTURE"),
        tutorials: timings.filter((timing) => timing.kind === "TUTORIAL"),
      };
    })
    .filter((row) => row.lectures.length > 0 || row.tutorials.length > 0);

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
            {isLoading && (
              <tr>
                <td colSpan={3} className="px-6 py-6 text-sm text-gray-500 text-center">
                  Loading class timings...
                </td>
              </tr>
            )}

            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-6 text-sm text-gray-500 text-center">
                  {isError
                    ? "Class timings could not be loaded right now."
                    : "Class timings will be published shortly."}
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                  {row.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
                  {row.lectures.length === 0
                    ? "—"
                    : row.lectures.map((timing) => (
                        <span key={timing.id} className="block whitespace-nowrap">
                          {describe(timing)}
                        </span>
                      ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {row.tutorials.length === 0
                    ? "—"
                    : row.tutorials.map((timing) => (
                        <span key={timing.id} className="block whitespace-nowrap">
                          {describe(timing)}
                        </span>
                      ))}
                </td>
              </tr>
            ))}
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
